import { Category } from './../../categories/models/category.model';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  description: string;

  @Field()
  isbn: string;

  @Field()
  author: string;

  @Field()
  publishingCompany: string;

  @Field()
  language: string;

  @Field(() => Date)
  releaseDate: Date;

  @Field()
  coverType: string;

  @Field(() => Int)
  numberOfPages: number;

  @Field(() => Float)
  value: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}