import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { Address } from './models/address.model';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation(() => Address)
  async createAddress(@Args('userId') userId: string, @Args('data') data: CreateAddressInput): Promise<Address> {
    return this.addressesService.create(userId, data);
  }

  @Query(() => [Address], { name: 'addresses' })
  async findAll(@Args('userId') userId: string): Promise<Address[]> {
    return this.addressesService.findAll(userId);
  }

  @Query(() => Address, { name: 'address' })
  async findOne(@Args('userId') userId: string, @Args('id', { type: () => Int }) id: number): Promise<Address> {
    return this.addressesService.findOne(userId, id);
  }

  @Mutation(() => Address)
  async updateAddress(
    @Args('userId') userId: string,
    @Args('id') id: number,
    @Args('data') data: UpdateAddressInput): Promise<Address> {
    return this.addressesService.update(userId, id, data);
  }

  @Mutation(() => Boolean)
  async removeAddress(@Args('userId') userId: string, @Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.addressesService.remove(userId, id);
  }
}
