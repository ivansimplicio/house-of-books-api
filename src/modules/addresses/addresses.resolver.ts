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

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Address)
  async createAddress(@Args('userId') userId: string, @Args('data') data: CreateAddressInput): Promise<Address> {
    return this.addressesService.create(userId, data);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [Address], { name: 'addresses' })
  async findAll(@Args('userId') userId: string): Promise<Address[]> {
    return this.addressesService.findAll(userId);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => Address, { name: 'address' })
  async findOne(@Args('userId') userId: string, @Args('id', { type: () => Int }) id: number): Promise<Address> {
    return this.addressesService.findOne(userId, id);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Address)
  async updateAddress(
    @Args('userId') userId: string,
    @Args('id') id: number,
    @Args('data') data: UpdateAddressInput): Promise<Address> {
    return this.addressesService.update(userId, id, data);
  }

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async removeAddress(@Args('userId') userId: string, @Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.addressesService.remove(userId, id);
  }
}
