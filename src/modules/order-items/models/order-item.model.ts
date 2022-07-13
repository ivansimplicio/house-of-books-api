import { Book } from './../../books/models/book.model';
import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {

  @Field(() => ID)
  id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  discount: number;

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Book)
  book: Book;
}
