import { Book } from './../../books/models/book.model';
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

  @Field(() => [Book], { nullable: true })
  books?: Book[];
}