import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UrlsModule } from './urls/urls.module';
import { UrlsService } from './urls/service/urls.service';
import { PrismaService } from './prismaService/prisma.service';
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, ConfigModule, UrlsModule],
      controllers: [AppController],
      providers: [UrlsService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(
        `Hello in O-shortener 🥰 <a href=${process.env.DOCS_URL}>API Docs</a>`,
      );
    });
  });
});
