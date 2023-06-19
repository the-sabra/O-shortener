import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/service/auth.service';
import { PrismaService } from '../src/prismaService/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const user = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      const credentials = {
        email: 'test@example.com',
        password: 'testPassword',
      };
      const token = 'testToken';

      const findFirstSpy = jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);
      const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const jwtSignSpy = jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await authService.login(credentials.email, credentials.password);

      expect(result).toEqual({ access_token: token });
      expect(findFirstSpy).toBeCalledWith({ where: { email: credentials.email } });
      expect(bcryptCompareSpy).toBeCalledWith(credentials.password, user.password);
      expect(jwtSignSpy).toBeCalledWith({ email: user.email, userId: user.id }, { secret: process.env.JWT_SECRET });
    });

    it('should throw an error if user not found', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'testPassword',
      };

      const findFirstSpy = jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

      await expect(authService.login(credentials.email, credentials.password)).rejects.toThrow(HttpException);
      expect(findFirstSpy).toBeCalledWith({ where: { email: credentials.email } });
    });

    // similarly, you can add a test case for the scenario where password is incorrect
  });
});
