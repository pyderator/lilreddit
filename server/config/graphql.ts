import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      context: (req) => ({
        req,
      }),
    };
  }
}
