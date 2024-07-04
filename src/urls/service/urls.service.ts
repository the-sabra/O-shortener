import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isValidUrl } from '../utils/isValidUrl';
import { PrismaService } from '../../prismaService/prisma.service';
import { NewUrl } from '../utils/NewUrlType';
import { Urls } from '@prisma/client';
import { UpdatedUrl } from '../utils/updatedUrl';
import { CachingService } from 'src/caching/caching.service';

@Injectable()
export class UrlsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly CashService: CachingService,
  ) {}

  async createUrlShorter(longUrlData: NewUrl) {
    if (!isValidUrl(longUrlData.longUrl)) {
      throw new HttpException(
        { status: false, message: 'not valid URL' },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const crypto = await import('node:crypto');
    try {
      if (await this.userExist(longUrlData.userId)) {
        throw new HttpException(
          { status: false, reason: 'user not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      let short = crypto.randomBytes(3).toString('hex');

      const checkShortCodeExists = await this.prisma.urls.findFirst({
        where: { short_code: short },
      });
      if (checkShortCodeExists) {
        short = crypto.randomBytes(3).toString('hex');
      }
      const checkLongUrl: Urls = await this.prisma.urls.findFirst({
        where: {
          long_url: longUrlData.longUrl,
          user_id: longUrlData.userId,
        },
      });
      if (checkLongUrl) {
        throw new HttpException(
          { status: false, reason: 'URL already exists' },
          HttpStatus.CONFLICT,
        );
      }
      const res: Urls = await this.prisma.urls.create({
        data: {
          long_url: longUrlData.longUrl,
          short_code: short,
          user_id: longUrlData.userId,
        },
      });
      const shortURl = `${longUrlData.protocol}://${longUrlData.host}/${short}`;
      return { newURL: shortURl, urlId: res.id };
    } catch (error) {
      throw error;
    }
  }

  // the controller in app controller to be URL short
  async getLongUrl(shortCode: string) {
    try {
      if (!(await this.CashService.isCashed(shortCode))) {
        const res: { long_url: string } = await this.prisma.urls.findFirst({
          where: {
            short_code: shortCode,
          },
          select: {
            id: false,
            short_code: false,
            updateAt: false,
            createdAt: false,
            long_url: true,
          },
        });
        if (!res) {
          throw new HttpException('this link not found', HttpStatus.NOT_FOUND);
        }
        await this.updateHit(shortCode);
        // console.log(`uncached`);
        await this.CashService.setData(shortCode, res.long_url, 900000);
        return res.long_url;
      } else {
        const cashedOutput = await this.CashService.getData(shortCode);

        // await this.prisma.urls.update({
        //   where: { short_code: shortCode },
        //   data: { hits: { increment: 1 } },
        // });
        await this.updateHit(shortCode);
        // console.log(`cached`);
        return cashedOutput;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateLongUrl(newURL: { urlId: string; long_url: string }) {
    try {
      const url: UpdatedUrl = await this.prisma.urls.update({
        where: {
          id: newURL.urlId,
        },
        data: {
          long_url: newURL.long_url,
          hits: 0,
        },
        select: {
          short_code: false,
          id: false,
          long_url: true,
          updateAt: true,
          hits: true,
        },
      });
      return { res: url, status: true };
    } catch (error) {
      throw error;
    }
  }

  async getUserUrls(userId: string, email: string) {
    try {
      const user_urls = await this.prisma.user.findFirst({
        where: {
          id: userId,
          email: email,
        },
        select: {
          id: false,
          name: true,
          email: true,
          urls: {
            select: {
              id: false,
              hits: true,
              short_code: true,
            },
          },
        },
      });
      return { res: user_urls, status: true };
    } catch (error) {
      throw error;
    }
  }

  async deleteURl(shortCode: string) {
    try {
      const checkURlExist = await this.prisma.urls.findUnique({
        where: { short_code: shortCode },
      });
      if (!checkURlExist) {
        throw new HttpException('short code not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.urls.delete({ where: { short_code: shortCode } });
      return {
        status: true,
        res: 'Delete Done',
      };
    } catch (error) {
      throw error;
    }
  }

  private async userExist(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const check = user === null;
    console.log(check);
    return check;
  }

  // increment the hit counter +1
  private async updateHit(shortCode: string) {
    try {
      await this.prisma.urls.update({
        where: { short_code: shortCode },
        data: { hits: { increment: 1 } },
      });
    } catch (error) {
      throw error;
    }
  }
}
