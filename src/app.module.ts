import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UrlsService } from './urls/service/urls.service';
import { UrlsModule } from './urls/urls.module';
import { PrismaService } from './prismaService/prisma.service';
import { CachingService } from './caching/caching.service';
import { CachingModule } from './caching/caching.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UrlsModule,
    CachingModule,
  ],
  controllers: [AppController],
  providers: [UrlsService, PrismaService, CachingService],
})
export class AppModule {}
