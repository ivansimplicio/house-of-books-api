import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [String])
  roles: string[];
}
