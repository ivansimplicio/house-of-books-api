import { OrderItem } from './../../order-items/models/order-item.model';
import { DeliveryAddress } from './../../delivery-addresses/models/delivery-address.model';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Order {

  @Field(() => ID)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => DeliveryAddress)
  deliveryAddress: DeliveryAddress;

  @Field(() => [OrderItem])
  items: OrderItem[];
}
