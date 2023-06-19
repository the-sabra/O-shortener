import { Test } from '@nestjs/testing';
import { AuthService } from '../src/auth/service/auth.service';
import { PrismaService } from '../src/prismaService/prisma.service';
import { JwtService } from '@nestjs/jwt';

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

  describe('signUp', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testPassword',
      };

      const prismaSpy = jest.spyOn(prismaService, 'user').mockImplementation(() => {
        // Implement a mock 'user' method that returns a promise that resolves to the newUser object.
        // This is to simulate a successful creation of a new user in the database.
        return Promise.resolve(newUser);
      });

      const result = await authService.signUp(newUser);

      expect(result).toEqual({ status: true, res: newUser });
      expect(prismaSpy).toBeCalledWith(newUser);
    });
  });
});
