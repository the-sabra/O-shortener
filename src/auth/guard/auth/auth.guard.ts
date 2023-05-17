import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      req['email']=payload.email;
      req['userId']=payload.userId;

    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
