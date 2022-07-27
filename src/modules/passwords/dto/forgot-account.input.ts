import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class ForgotAccountInput {

  @IsNotEmpty({ message: 'The {email} field cannot be empty.'})
  @IsEmail()
  @MaxLength(50)
  @Field(() => String)
  email: string;
}
