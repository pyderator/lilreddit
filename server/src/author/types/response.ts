import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from '../entities/author.entity';

@ObjectType()
export class AuthError {
  @Field({ nullable: false })
  message: string;

  @Field({ nullable: false })
  field: string;

  @Field({ nullable: true })
  code?: number;
}

@ObjectType()
export default class AuthResponse {
  @Field(() => [AuthError], { nullable: true })
  error?: AuthError[];

  @Field(() => Author, { nullable: true })
  data?: Author;
}
