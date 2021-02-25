import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as redis from 'redis';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const redisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get<number>('REDIS_SESSION_PORT'),
  });
  app.use(
    session({
      name: 'qid',
      store: new redisStore({ client: redisClient }),
      secret: 'thisismysecret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
