import { Order } from './../../orders/models/order.model';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/modules/roles/models/role.model';
import { Address } from './../../addresses/models/address.model';

@ObjectType()
export class User {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Role], { nullable: true })
  roles?: Role[];

  @Field(() => [Address], { nullable: true })
  addresses?: Address[];

  @Field(() => [Order], { nullable: true })
  orders?: Order[];
}
