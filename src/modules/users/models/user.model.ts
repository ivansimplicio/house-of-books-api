import { ObjectType, Field, ID } from '@nestjs/graphql';
import Role from 'src/modules/roles/models/role.model';

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

  @Field(() => [Role])
  roles: Role[];
}
