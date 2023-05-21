import { HttpException, HttpStatus } from '@nestjs/common';

const emailDb = ['xre@fd.com', 'x@x.com'];

const UserDto = {
  email: 'x@x.com',
  name: 'xxx',
  password: 'Hello',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mockAuthService = {
  signUp: jest.fn(async (userData) => {
    if (emailDb[0] == userData.email) {
      throw new HttpException('email exist', HttpStatus.NOT_ACCEPTABLE);
    }
    return {
      status: true,
      res: {
        email: userData.email,
        name: userData.name,
      },
    };
  }),
  login: jest.fn(async (email: string, password: string) => {
    if (!emailDb.indexOf(email)) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    if (UserDto.password !== password) {
      throw new HttpException('wrong password', HttpStatus.NOT_ACCEPTABLE);
    }
    return {
      access_token: 'payload',
    };
  }),
};
