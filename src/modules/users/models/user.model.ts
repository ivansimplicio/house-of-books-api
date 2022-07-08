import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
