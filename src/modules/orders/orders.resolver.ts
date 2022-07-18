import { GqlAuthGuard } from './../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/common/roles.decorator';
import { Role } from '../authorization/common/roles.enum';
import { RolesGuard } from '../authorization/guards/roles.guard';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Order)
  async createOrder(@Args('userId') userId: string, @Args('data') data: CreateOrderInput): Promise<Order> {
    return this.ordersService.create(userId, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [Order], { name: 'orders' })
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Order, { name: 'order' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }
}
