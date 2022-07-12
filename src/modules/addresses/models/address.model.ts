import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Address {

  @Field(() => ID)
  id: number;
  
  @Field()
  street: string;

  @Field({ nullable: true })
  number?: string;

  @Field()
  district: string;

  @Field()
  zipCode: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
