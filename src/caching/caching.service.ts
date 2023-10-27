import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async isCashed(shortCode: string): Promise<boolean> {
    const url = await this.cacheManager.get(shortCode);
    if (url) return true;
    return false;
  }
  async setData(key: string, value: any, ttl?: number): Promise<void> {
    this.cacheManager.set(key, value, ttl);
  }
  async getData(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
}
