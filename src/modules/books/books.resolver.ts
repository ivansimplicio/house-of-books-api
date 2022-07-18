import { GqlAuthGuard } from './../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './models/book.model';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/common/roles.decorator';
import { Role } from '../authorization/common/roles.enum';
import { RolesGuard } from '../authorization/guards/roles.guard';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Book)
  async createBook(@Args('data') data: CreateBookInput): Promise<Book> {
    return this.booksService.create(data);
  }

  @Query(() => [Book], { name: 'books' })
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Book)
  async updateBook(@Args('id') id: number, @Args('data') data: UpdateBookInput): Promise<Book> {
    return this.booksService.update(id, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async removeBook(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.booksService.remove(id);
  }
}
