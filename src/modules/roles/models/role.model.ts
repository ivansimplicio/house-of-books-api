import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Role {

  @Field(() => ID)
  id: number;

  @Field()
  role: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}