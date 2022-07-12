import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateAddressInput {
  
  @IsNotEmpty({ message: 'The {street} field cannot be empty.'})
  @MaxLength(100)
  @Field(() => String)
  street: string;

  @MaxLength(10)
  @Field(() => String)
  number: string;

  @IsNotEmpty({ message: 'The {district} field cannot be empty.'})
  @MaxLength(30)
  @Field(() => String)
  district: string;

  @IsNotEmpty({ message: 'The {zipCode} field cannot be empty.'})
  @MaxLength(20)
  @Field(() => String)
  zipCode: string;

  @IsNotEmpty({ message: 'The {city} field cannot be empty.'})
  @MaxLength(50)
  @Field(() => String)
  city: string;

  @IsNotEmpty({ message: 'The {state} field cannot be empty.'})
  @MaxLength(50)
  @Field(() => String)
  state: string;
}
