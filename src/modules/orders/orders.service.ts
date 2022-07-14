import { Address } from './../addresses/entities/address.entity';
import { DeliveryAddress } from './../delivery-addresses/entities/delivery-address.entity';
import { OrderItem } from './../order-items/entities/order-item.entity';
import { Book } from './../books/entities/book.entity';
import { AddressesService } from './../addresses/addresses.service';
import { Order } from './entities/order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  private preloadRelations = ['deliveryAddress', 'items', 'user', 'items.book'];

  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(DeliveryAddress) private deliveryAddresesRepository: Repository<DeliveryAddress>,
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private readonly addressesService: AddressesService) {}

  async create(userId: string, data: CreateOrderInput): Promise<Order> {
    const address = await this.validateNewOrder(data, userId);
    const orderItems = await this.getOrderItems(data);
    const amount = this.calculateOrderValue(orderItems);
    const order = await this.ordersRepository.save({ amount, userId });
    await this.orderItemsRepository.save(this.orderItemsWithOrderId(orderItems, order.id));
    await this.deliveryAddresesRepository.save(this.formatDeliveryAddress(address, order.id));
    return this.findOne(order.id);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: this.preloadRelations });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id }, relations: this.preloadRelations });
    if(!order){
      throw new NotFoundException('Order not found.');
    }
    return order;
  }

  private async validateNewOrder(orderInput: CreateOrderInput, userId: string): Promise<Address> {
    const address = await this.addressesService.findOne(userId, orderInput.addressId);
    await this.findBooks(this.getBookIds(orderInput));
    return address;
  }

  private getBookIds(orderInput: CreateOrderInput): number[]{
    return orderInput.items.map(item => item.bookId);
  }

  private async findBooks(bookIds: number[]): Promise<void> {
    for(let id of bookIds){
      const book = await this.booksRepository.findOne({ where: { id } });
      if(!book){
        throw new NotFoundException(`Book with id=${id} not found.`);
      }
    }
  }

  private async getOrderItems(orderInput: CreateOrderInput): Promise<OrderItem[]> {
    const orderItems: OrderItem[] = [];
    for (let item of orderInput.items) {
      const book = await this.booksRepository.findOneOrFail({ where: { id: item.bookId } });
      const quantity = item.quantity;
      const discount = item.discount;
      const amount = parseFloat((book.value * (1 - discount) * quantity).toFixed(2));
      orderItems.push({ quantity, discount, amount, bookId: item.bookId } as OrderItem);
    }
    return orderItems;
  }

  private calculateOrderValue(orderItems: OrderItem[]): number {
    const amount = orderItems.reduce((initial, current) => initial + current.amount, 0);
    return parseFloat(amount.toFixed(2));
  }

  private orderItemsWithOrderId(orderItems: OrderItem[], orderId: number) {
    return orderItems.map(item => ({ ...item, orderId }));
  }

  private formatDeliveryAddress(address: Address, orderId: number): DeliveryAddress {
    const { street, number, district, zipCode, city, state } = address;
    return { street, number, district, zipCode, city, state, orderId } as DeliveryAddress;
  }
}
