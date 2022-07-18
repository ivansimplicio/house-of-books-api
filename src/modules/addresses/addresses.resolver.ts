import { GqlAuthGuard } from './../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { Address } from './models/address.model';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/common/roles.decorator';
import { Role } from '../authorization/common/roles.enum';
import { RolesGuard } from '../authorization/guards/roles.guard';
import { AuthUser } from '../authentication/utils/auth-user.decorator';
import { User } from './../users/entities/user.entity';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Address)
  async createAddress(@AuthUser() authUser: User, @Args('data') data: CreateAddressInput): Promise<Address> {
    return this.addressesService.create(authUser.id, data);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [Address], { name: 'addresses' })
  async findAll(@AuthUser() authUser: User): Promise<Address[]> {
    return this.addressesService.findAll(authUser.id);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => Address, { name: 'address' })
  async findOne(@AuthUser() authUser: User, @Args('id') id: number): Promise<Address> {
    return this.addressesService.findOne(authUser.id, id);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Address)
  async updateAddress(
    @AuthUser() authUser: User,
    @Args('id') id: number,
    @Args('data') data: UpdateAddressInput): Promise<Address> {
    return this.addressesService.update(authUser.id, id, data);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async removeAddress(@AuthUser() authUser: User, @Args('id') id: number): Promise<boolean> {
    return this.addressesService.remove(authUser.id, id);
  }
}
