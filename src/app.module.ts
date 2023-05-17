import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UrlsService } from './urls/service/urls.service';
import { UrlsModule } from './urls/urls.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule,ConfigModule, UrlsModule],
  controllers: [AppController],
  providers: [AppService, UrlsService,PrismaService],
})
export class AppModule {}
