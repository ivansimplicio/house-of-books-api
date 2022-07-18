import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AuthenticationInput {

  @IsNotEmpty({ message: 'The {email} field cannot be empty.'})
  @IsEmail()
  @MaxLength(50)
  @Field(() => String)
  email: string;

  @IsNotEmpty({ message: 'The {password} field cannot be empty.'})
  @MinLength(8)
  @MaxLength(25)
  @Field(() => String)
  password: string;
}
