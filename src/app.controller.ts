import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { UrlsService } from './urls/service/urls.service';

@Controller()
export class AppController {
  constructor(private urlService: UrlsService) {}
  @Get('/')
  getHello() {
    console.log(process.env.DOCS_URL);
    return `Hello in O-shortener 🥰 <a href=${process.env.DOCS_URL}>API Docs</a>`;
  }
  @Get('/:short')
  @Redirect()
  async getShortUrl(@Param('short') short: string) {
    const longUrl = await this.urlService.getLongUrl(short);
    return { url: longUrl };
  }
}
