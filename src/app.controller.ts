import { Controller, Get, Param, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { UrlsService } from './urls/service/urls.service';
import { UserAuth } from './urls/controller/Dtos/PayloadDto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private urlService: UrlsService,
  ) {}

  @Get('/:short')
  @Redirect()
  async getShortUrl(@Param('short') short: string, @Req() req: UserAuth) {
    const { userId } = req;
    const longUrl = await this.urlService.getLongUrl(short, userId);
    return { url: longUrl };
  }
}
  