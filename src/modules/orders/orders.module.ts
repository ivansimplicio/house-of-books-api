import { DeliveryAddress } from './../delivery-addresses/entities/delivery-address.entity';
import { OrderItem } from './../order-items/entities/order-item.entity';
import { Book } from './../books/entities/book.entity';
import { Address } from './../addresses/entities/address.entity';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { AddressesService } from './../addresses/addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Address, Book, OrderItem, DeliveryAddress])],
  providers: [OrdersResolver, OrdersService, AddressesService]
})
export class OrdersModule {}
