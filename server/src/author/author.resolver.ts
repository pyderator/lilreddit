import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import registerSchema from './schema/registerSchema';
import { RegisterInput } from './types/inputRegister';
import AuthResponse from './types/response';

// Argon2
import * as argon2 from 'argon2';
// XSS Filter
import { filterXSS } from 'xss';

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
}
