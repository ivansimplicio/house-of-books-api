import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class CreateOrderItemInput {

  @IsNotEmpty({ message: 'The {bookId} field cannot be empty.'})
  @Field(() => Int)
  bookId: number;
  
  @IsNotEmpty({ message: 'The {quantity} field cannot be empty.'})
  @Min(1)
  @Field(() => Int)
  quantity: number;

  @IsNotEmpty({ message: 'The {discount} field cannot be empty.'})
  @Min(0)
  @Max(0.99)
  @Field(() => Float)
  discount: number;
}
