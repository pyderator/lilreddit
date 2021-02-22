import { Field, InputType } from '@nestjs/graphql';

/* 

Register Contains:
1. First Name
2. Last Name
3. Username
4. Password
5. Email


*/

@InputType()
export class RegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
