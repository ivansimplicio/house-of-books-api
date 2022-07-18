import { GqlAuthGuard } from './../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { Address } from './models/address.model';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address)
  async createAddress(@Args('userId') userId: string, @Args('data') data: CreateAddressInput): Promise<Address> {
    return this.addressesService.create(userId, data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Address], { name: 'addresses' })
  async findAll(@Args('userId') userId: string): Promise<Address[]> {
    return this.addressesService.findAll(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Address, { name: 'address' })
  async findOne(@Args('userId') userId: string, @Args('id', { type: () => Int }) id: number): Promise<Address> {
    return this.addressesService.findOne(userId, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address)
  async updateAddress(
    @Args('userId') userId: string,
    @Args('id') id: number,
    @Args('data') data: UpdateAddressInput): Promise<Address> {
    return this.addressesService.update(userId, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async removeAddress(@Args('userId') userId: string, @Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.addressesService.remove(userId, id);
  }
}
