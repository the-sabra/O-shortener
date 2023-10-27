import { Module } from '@nestjs/common';
import { CachingService } from './caching.service';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      isGlobal: true,
    }),
  ],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
