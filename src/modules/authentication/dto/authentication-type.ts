import { UserType } from './user-type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthenticationType {

  @Field(() => UserType)
  user: UserType;

  @Field()
  token: string;
}
