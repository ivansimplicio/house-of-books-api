import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Order {

  @Field(() => ID)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
