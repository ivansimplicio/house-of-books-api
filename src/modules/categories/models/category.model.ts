import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Category {

  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}