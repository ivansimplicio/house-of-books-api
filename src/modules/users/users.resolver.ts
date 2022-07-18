import { GqlAuthGuard } from './../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/common/roles.decorator';
import { Role } from '../authorization/common/roles.enum';
import { RolesGuard } from '../authorization/guards/roles.guard';
import { User as UserEntity } from './entities/user.entity';
import { AuthUser } from '../authentication/utils/auth-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.usersService.create(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async findOne(@AuthUser() authUser: UserEntity, @Args('id') id: string): Promise<User> {
    return this.usersService.findOne(authUser, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(@AuthUser() authUser: UserEntity, @Args('id') id: string, @Args('data') data: UpdateUserInput): Promise<User> {
    return this.usersService.update(authUser, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async removeUser(@AuthUser() authUser: UserEntity, @Args('id') id: string): Promise<boolean> {
    return this.usersService.remove(authUser, id);
  }
}
