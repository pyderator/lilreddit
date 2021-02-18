import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'config/database';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfigService } from 'config/graphql';
import { AuthorController } from './author/author.controller';

import { AuthorModule } from './author/author.module';
import { Author } from './author/entities/author.entity';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { RedisConf } from 'config/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphQLConfigService,
    }),
    RedisModule.forRootAsync({
      useClass: RedisConf,
    }),
    AuthorModule,
  ],
  controllers: [AppController, AuthorController],
  providers: [AppService, Author],
})
export class AppModule {}
