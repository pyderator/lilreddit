import { Resolver, Query } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';

@Resolver((of) => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Query((_) => String)
  helloWorld(): string {
    return 'Hello World';
  }
}
