import { faker } from '@faker-js/faker';

export const requestSTub = {
  body: {
    long_url: faker.internet.url(),
  },
  get: (data: string) => {
    return data;
  },
  userId: faker.string.uuid(),
  email: faker.internet.email(),
};

export const reqStubError = {
  body: {
    long_url: 'http://tst.test.com',
  },
  get: (data: string) => {
    return data;
  },
  userId: faker.string.uuid(),
};
