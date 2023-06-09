import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UrlsService } from './urls/service/urls.service';
import { UrlsModule } from './urls/urls.module';
import { PrismaService } from './prismaService/prisma.service';

@Module({
  imports: [AuthModule, ConfigModule, UrlsModule],
  controllers: [AppController],
  providers: [UrlsService, PrismaService],
})
export class AppModule {}
