import { CreateOrderItemInput } from './../../order-items/dto/create-order-item.input';
import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateOrderInput {

  @IsNotEmpty({ message: 'The {addressId} field cannot be empty.'})
  @Field(() => Int)
  addressId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemInput)
  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}
