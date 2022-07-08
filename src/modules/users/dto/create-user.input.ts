import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {

  @IsNotEmpty({ message: 'The {name} field cannot be empty.'})
  @MaxLength(50)
  @Field(() => String)
  name: string;
  
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

  @IsNotEmpty({ message: 'The {cpf} field cannot be empty.'})
  @MaxLength(11)
  @Field(() => String)
  cpf: string;

  @MaxLength(30)
  @Field(() => String, { defaultValue: '' })
  phoneNumber: string;
}
