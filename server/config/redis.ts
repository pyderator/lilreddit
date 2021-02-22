// Using stvslv/nestjs-ioredis package

import {
  RedisModuleOptions,
  RedisModuleOptionsFactory,
} from '@svtslv/nestjs-ioredis';

export class RedisConf implements RedisModuleOptionsFactory {
  createRedisModuleOptions(): RedisModuleOptions {
    return {
      config: {
        host: process.env.REDIS_URL,
        port: parseInt(process.env.REDIS_PORT),
      },
    };
  }
}
