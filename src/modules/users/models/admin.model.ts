import { User } from './user.model'
import { ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class Admin extends OmitType(User, ['addresses', 'orders']){
}