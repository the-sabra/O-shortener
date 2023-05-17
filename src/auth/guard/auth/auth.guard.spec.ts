import { AuthGuard } from './auth.guard';

describe('GuardGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
