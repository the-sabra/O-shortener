import { Module } from '@nestjs/common';
import { UrlsService } from './service/urls.service';
import { UrlsController } from './controller/urls.controller';
import { PrismaService } from 'src/prismaService/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { CachingService } from 'src/caching/caching.service';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, UrlsService, JwtService, CachingService],
  controllers: [UrlsController],
}) 
export class UrlsModule {}
