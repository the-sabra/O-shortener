import { isValidUrl } from 'src/urls/utils/isValidUrl';
import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NewUrl } from 'src/urls/utils/NewUrlType';

export const MockUrlsService = {
  createUrlShorter: jest.fn(async (UserAuth: NewUrl) => {
    if (!isValidUrl(UserAuth.longUrl)) {
      throw new Error('not valid URL');
    }
    const short = faker.number.int({ min: 100000, max: 999999 });
    if (UserAuth.longUrl == 'http://tst.test.com') {
      throw new HttpException(
        { status: false, reason: 'URL already exists' },
        HttpStatus.CONFLICT,
      );
    }
    return {
      newURL: faker.internet.url() + `${short}`,
      urlId: faker.string.uuid(),
    };
  }),

  updateLongUrl: jest.fn(async (updateUrl) => {
    return {
      status: true,
      res: {
        long_url: updateUrl.long_url,
        updateAt: faker.date.anytime(),
        hits: faker.number.int(),
      },
    };
  }),
  getUserUrls: jest.fn(async (userId: string, email: string) => {
    return {
      status: true,
      res: {
        email: email,
        name: faker.person.firstName(),
        urls: [
          {
            hits: faker.number.int(),
            short_code: faker.number.int({ min: 100000, max: 999999 }),
          },
        ],
      },
    };
  }),
};
