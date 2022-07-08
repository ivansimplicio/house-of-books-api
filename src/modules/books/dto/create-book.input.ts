import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, ArrayUnique, IsNotEmpty, IsPositive, MaxLength, Min } from 'class-validator';

@InputType()
export class CreateBookInput {

  @IsNotEmpty({ message: 'The {title} field cannot be empty.'})
  @MaxLength(50, { message: '{title} must be shorter than or equal to 50 characters.'})
  @Field(() => String)
  title: string;

  @MaxLength(80, { message: '{subtitle} must be shorter than or equal to 80 characters.',  })
  @Field(() => String)
  subtitle: string;

  @MaxLength(255, { message: '{description} must be shorter than or equal to 255 characters.'})
  @Field(() => String)
  description: string;

  @IsNotEmpty({ message: 'The {isbn} field cannot be empty.'})
  @MaxLength(30, { message: '{isbn} must be shorter than or equal to 30 characters.'})
  @Field(() => String)
  isbn: string;

  @IsNotEmpty({ message: 'The {author} field cannot be empty.'})
  @MaxLength(80, { message: '{author} must be shorter than or equal to 80 characters.'})
  @Field(() => String)
  author: string;

  @IsNotEmpty({ message: 'The {publishingCompany} field cannot be empty.'})
  @MaxLength(30, { message: '{publishingCompany} must be shorter than or equal to 30 characters.'})
  @Field(() => String)
  publishingCompany: string;

  @IsNotEmpty({ message: 'The {language} field cannot be empty.'})
  @MaxLength(20, { message: '{language} must be shorter than or equal to 20 characters.'})
  @Field(() => String)
  language: string;

  @Field(() => Date, { nullable: true })
  releaseDate?: Date;

  @MaxLength(20, { message: '{coverType} must be shorter than or equal to 20 characters.'})
  @Field(() => String)
  coverType: string;

  @IsNotEmpty({ message: 'The {numberOfPages} field cannot be empty.'})
  @IsPositive({ message: '{numberOfPages} must be a positive number.' })
  @Field(() => Int)
  numberOfPages: number;

  @IsNotEmpty({ message: 'The {value} field cannot be empty.'})
  @Min(0.1, { message: '{value} must not be less than 0.1' })
  @Field(() => Float)
  value: number;

  @ArrayNotEmpty({ message: 'The {categories} field cannot be empty.' })
  @ArrayUnique({ message: 'Each element of the {categories} array must be unique.' })
  @Field(() => [Int])
  categories: number[];
}
