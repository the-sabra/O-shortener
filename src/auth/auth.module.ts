import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
  exports:[AuthService]
})
export class AuthModule {}
