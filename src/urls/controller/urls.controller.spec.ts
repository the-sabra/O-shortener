import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UrlsService } from '../service/urls.service';
import { PrismaService } from 'src/prismaService/prisma.service';

import { faker } from '@faker-js/faker';
import { UserAuth } from './Dtos/PayloadDto';
import { UpdateUrlDto } from './Dtos/updateUrl';
import { HttpException } from '@nestjs/common';
import { reqStubError, requestSTub } from './stub/requestStub';
import { MockUrlsService } from '../../../__mocks__/mockUrlService';

const updateUrlStub = {
  long_url: new URL('http://hello@f*kdf.com'),
  urlId: faker.string.uuid(),
};
describe('UrlsController', () => {
  let controller: UrlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [PrismaService, UrlsService, JwtService],
      controllers: [UrlsController],
    })
      .overrideProvider(UrlsService)
      .useValue(MockUrlsService)
      .compile();

    controller = module.get<UrlsController>(UrlsController);
  });

  it('should create short Url', () => {
    expect(controller.createShortUrl(requestSTub as UserAuth)).resolves.toEqual(
      {
        newURL: expect.any(String),
        urlId: expect.any(String),
      },
    );
  });

  it('should be error if long url exist for user ', () => {
    expect(controller.createShortUrl(reqStubError as UserAuth)).rejects.toThrow(
      HttpException,
    );
  });

  it('should update long url ', () => {
    expect(
      controller.updateLongUrl(updateUrlStub as unknown as UpdateUrlDto),
    ).resolves.toEqual({
      status: true,
      res: {
        long_url: expect.any(URL),
        updateAt: expect.any(Date),
        hits: expect.any(Number),
      },
    });
  });

  it('should get user hits and urls', () => {
    expect(controller.UserUrls(requestSTub as UserAuth)).resolves.toEqual({
      status: true,
      res: {
        email: requestSTub.email,
        name: expect.any(String),
        urls: [
          {
            hits: expect.any(Number),
            short_code: expect.any(Number),
          },
        ],
      },
    });
  });
});
