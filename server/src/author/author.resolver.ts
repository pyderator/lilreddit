import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
// Argon2
import * as argon2 from 'argon2';
import { Request, Response } from 'express';
// XSS Filter
import { filterXSS } from 'xss';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import registerSchema from './schema/registerSchema';
import { LoginInput } from './types/inputLogin';
import { RegisterInput } from './types/inputRegister';
import AuthResponse from './types/response';

export type reqContext = {
  req: Request;
};
// overloading the module for fixing type.
declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
export type resContext = { res: Response };
@Resolver((of) => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  // Root Hello World Query
  @Query((_) => String)
  helloWorld(): string {
    return 'Hello World';
  }

  // Register Mutation
  @Mutation((_) => AuthResponse)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<AuthResponse> {
    registerInput = {
      firstName: filterXSS(registerInput.firstName),
      lastName: filterXSS(registerInput.lastName),
      email: filterXSS(registerInput.email),
      username: filterXSS(registerInput.username),
      password: filterXSS(registerInput.password),
    };
    try {
      var { error, value } = registerSchema.validate(
        {
          ...registerInput,
        },
        { abortEarly: false },
      );
      if (error) {
        throw error;
      }
    } catch (error) {
      const errors = [];
      error.details.forEach((d) =>
        errors.push({
          field: d.path[0],
          message: d.message.split(d.path[0] + '" ')[1],
        }),
      );
      return {
        error: errors,
      };
    } finally {
      if (!error) {
        const author = await this.authorService.register({
          ...registerInput,
          password: await argon2.hash(registerInput.password),
        });
        return {
          data: author,
        };
      }
    }
  }

  // Login Mutation
  @Mutation((_) => AuthResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() { req }: reqContext,
  ): Promise<AuthResponse> {
    loginInput = {
      username: filterXSS(loginInput.username),
      password: filterXSS(loginInput.password),
    };
    const response = await this.authorService.login({ ...loginInput });
    if (!response.status) {
      return {
        error: [
          {
            field: response.field,
            message: response.message,
          },
        ],
      };
    }
    req.session.userId = response.user.id;
    return {
      data: response.user,
    };
  }
  // Logout Mutation
  @Mutation((_) => Boolean)
  async logout(
    @Context() { req, res }: reqContext & resContext,
  ): Promise<Boolean> {
    console.log(res);
    return new Promise((resolve) =>
      req.res.req.session.destroy((err) => {
        res.clearCookie('qid');
        if (err) {
          resolve(false);
          return false;
        }
        resolve(true);
      }),
    );
  }

  // Me Query
  @Query((_) => AuthResponse)
  async me(@Context() { req }: reqContext): Promise<AuthResponse> {
    const { userId } = req.res.req.session;
    if (!userId) {
      return {
        error: [
          {
            field: 'session',
            message: 'Please Login in',
          },
        ],
      };
    }
    const user = await this.authorService.findOne(userId);
    return {
      data: user,
    };
  }
}
