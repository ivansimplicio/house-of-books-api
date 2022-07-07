import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CategoryInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'The {name} field cannot be empty.'})
  @MaxLength(50, { message: '{name} must be shorter than or equal to 50 characters.'})
  name: string;
}
