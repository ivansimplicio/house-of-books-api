import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {

  private MINIMUM_NUMBER_OF_ADDRESSES = 1;
  private MAXIMUM_NUMBER_OF_ADDRESSES = 3;

  constructor(@InjectRepository(Address) private addressesRepository: Repository<Address>) {}

  async create(userId: string, data: CreateAddressInput): Promise<Address> {
    const quantity = await this.numberOfRegisteredAddresses(userId);
    if(quantity < this.MAXIMUM_NUMBER_OF_ADDRESSES){
      return this.addressesRepository.save({ ...data, userId });
    }
    throw new BadRequestException(`You can only have ${this.MAXIMUM_NUMBER_OF_ADDRESSES} registered addresses`);
  }

  async findAll(userId: string): Promise<Address[]> {
    return this.addressesRepository.find({ where: { userId } });
  }

  async findOne(userId: string, id: number): Promise<Address> {
    const address = await this.addressesRepository.findOne({ where: { id, userId } });
    if(!address){
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async update(userId: string, id: number, data: UpdateAddressInput): Promise<Address> {
    const address = await this.findOne(userId, id);
    return this.addressesRepository.save({ ...address, ...data });
  }

  async remove(userId: string, id: number): Promise<boolean> {
    const quantity = await this.numberOfRegisteredAddresses(userId);
    if(quantity > this.MINIMUM_NUMBER_OF_ADDRESSES){
      const address = await this.findOne(userId, id);
      const deletedAddress = await this.addressesRepository.remove(address);
      return deletedAddress ? true : false;
    }
    throw new BadRequestException(`You must remain with at least ${this.MINIMUM_NUMBER_OF_ADDRESSES} registered address`);
  }

  private async numberOfRegisteredAddresses(userId: string): Promise<number> {
    const addresses = await this.findAll(userId);
    return addresses.length;
  }
}
