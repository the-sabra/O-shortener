import { Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../src/auth/guard/auth/auth.guard';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    // Mock the Reflector, which is a NestJS utility class used internally by the AuthGuard
    const mockReflector = {
      getAllAndOverride: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    authGuard = moduleRef.get<AuthGuard>(AuthGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  // Test cases will go here...

  describe('canActivate', () => {
    it('should allow the request to proceed if the user is authenticated', async () => {
      // Mock the ExecutionContext passed to canActivate
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: '123',
              email: 'test@example.com',
            },
          }),
        }),
      } as unknown as ExecutionContext;
  
      expect(await authGuard.canActivate(context)).toBe(true);
    });
  
    it('should not allow the request to proceed if the user is not authenticated', async () => {
      // Mock the ExecutionContext passed to canActivate
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({}),
        }),
      } as unknown as ExecutionContext;
  
      expect(await authGuard.canActivate(context)).toBe(false);
    });
  });
  
});
