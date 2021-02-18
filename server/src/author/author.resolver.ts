import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// Argon2
import * as argon2 from 'argon2';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { RegisterInput } from './types/inputRegister';

@Resolver((of) => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  // Root Hello World Query
  @Query((_) => String)
  helloWorld(): string {
    return 'Hello World';
  }

  // Register Mutation
  @Mutation((_) => Author)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<Author> {
    return this.authorService.register({
      ...registerInput,
      password: await argon2.hash(registerInput.password),
    });
  }
}
