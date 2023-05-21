import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prismaService/prisma.service';
import { AuthService } from '../service/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { mockAuthService } from '../../../__mo/mockAuthService';

describe('AuthController', () => {
  let controller: AuthController;

  const emailDb = ['xre@fd.com', 'x@x.com'];

  const UserDto = {
    email: 'x@x.com',
    name: 'xxx',
    password: 'Hello',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
      exports: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();
    controller = module.get<AuthController>(AuthController);
  });
  it('should create user', () => {
    expect(controller.userSignup(UserDto)).resolves.toEqual({
      status: true,
      res: {
        email: UserDto.email,
        name: UserDto.name,
      },
    });
  });

  it('should be Error if User exist', () => {
    expect(
      controller.userSignup({
        name: UserDto.name,
        password: UserDto.password,
        email: emailDb[0],
      }),
    ).rejects.toThrowError(HttpException);
  });

  it('should login succusccflly', () => {
    expect(
      controller.userLogin({
        email: UserDto.email,
        password: UserDto.password,
      }),
    ).resolves.toEqual({
      access_token: expect.any(String),
    });
  });
});
