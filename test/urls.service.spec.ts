import { Test } from '@nestjs/testing';
import { UrlsService } from '../src/urls/service/urls.service';
import { PrismaService } from '../src/prismaService/prisma.service';

describe('UrlsService', () => {
  let urlsService: UrlsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UrlsService, PrismaService],
    }).compile();

    urlsService = moduleRef.get<UrlsService>(UrlsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('createUrlShorter', () => {
    it('should create a shortened URL and return it', async () => {
      const urlInfo = {
        longUrl: 'https://example.com',
        host: 'localhost',
        protocol: 'http',
        userId: '123',
      };
      const shortUrl = 'https://localhost/abc123';

      const prismaCreateSpy = jest.spyOn(prismaService.url, 'create').mockResolvedValue({ ...urlInfo, shortUrl });

      const result = await urlsService.createUrlShorter(urlInfo);

      expect(result).toEqual({ status: true, res: shortUrl });
      expect(prismaCreateSpy).toHaveBeenCalledWith({ data: { ...urlInfo, shortUrl } });
    });
  });


  describe('updateLongUrl', () => {
    it('should update a long URL and return the updated URL', async () => {
      const updateUrlDto = {
        id: 'abc123',
        longUrl: 'https://updated-example.com',
      };
      const updatedUrl = { ...updateUrlDto, shortUrl: 'https://localhost/abc123' };
  
      const prismaUpdateSpy = jest.spyOn(prismaService.url, 'update').mockResolvedValue(updatedUrl);
  
      const result = await urlsService.updateLongUrl(updateUrlDto);
  
      expect(result).toEqual({ status: true, res: updatedUrl });
      expect(prismaUpdateSpy).toHaveBeenCalledWith({ 
        where: { id: updateUrlDto.id },
        data: { longUrl: updateUrlDto.longUrl },
      });
    });
  });


  describe('getUserUrls', () => {
    it('should retrieve all URLs associated with a user and return them', async () => {
      const userId = '123';
      const email = 'user@example.com';
      const userUrls = [
        { id: 'abc123', longUrl: 'https://example.com', shortUrl: 'https://localhost/abc123' },
        // ... other URLs
      ];
  
      const prismaFindManySpy = jest.spyOn(prismaService.url, 'findMany').mockResolvedValue(userUrls);
  
      const result = await urlsService.getUserUrls(userId, email);
  
      expect(result).toEqual({ status: true, res: userUrls });
      expect(prismaFindManySpy).toHaveBeenCalledWith({ where: { userId } });
    });
  });

  describe('createShortUrl', () => {
    it('should create a new shortened URL and return it', async () => {
      const userAuth = {
        body: { long_url: 'https://example.com' },
        get: () => 'localhost',
        protocol: 'http',
        userId: '123',
      };
      const createdUrl = { longUrl: userAuth.body.long_url, shortUrl: 'http://localhost/abc123' };
  
      urlsService.createUrlShorter.mockResolvedValue(createdUrl);
  
      const result = await urlsController.createShortUrl(userAuth);
  
      expect(result).toEqual(createdUrl);
      expect(urlsService.createUrlShorter).toHaveBeenCalledWith({
        longUrl: userAuth.body.long_url,
        host: userAuth.get('host'),
        protocol: userAuth.protocol,
        userId: userAuth.userId,
      });
    });
  });
  
});
