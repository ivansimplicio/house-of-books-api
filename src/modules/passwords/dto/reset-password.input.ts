import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  
  @IsNotEmpty({ message: 'The {newPassword} field cannot be empty.'})
  @MinLength(8)
  @MaxLength(25)
  @Field(() => String)
  newPassword: string;

  @IsNotEmpty({ message: 'The {passwordConfirmation} field cannot be empty.'})
  @MinLength(8)
  @MaxLength(25)
  @Field(() => String)
  passwordConfirmation: string;
}
