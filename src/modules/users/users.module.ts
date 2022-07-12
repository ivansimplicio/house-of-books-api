import { AddressesService } from './../addresses/addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Address } from './../addresses/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Address])],
  providers: [UsersResolver, UsersService, AddressesService]
})
export class UsersModule {}
