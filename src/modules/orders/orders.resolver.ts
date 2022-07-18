import { GqlAuthGuard } from './../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/common/roles.decorator';
import { Role } from '../authorization/common/roles.enum';
import { RolesGuard } from '../authorization/guards/roles.guard';
import { AuthUser } from '../authentication/utils/auth-user.decorator';
import { User } from './../users/entities/user.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Order)
  async createOrder(@AuthUser() authUser: User, @Args('data') data: CreateOrderInput): Promise<Order> {
    return this.ordersService.create(authUser, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [Order], { name: 'orders' })
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Order, { name: 'order' })
  async findOne(@AuthUser() authUser: User, @Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.ordersService.findOne(authUser, id);
  }
}
