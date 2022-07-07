import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './entities/book.entity';
import { Category } from './../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category])],
  providers: [BooksResolver, BooksService]
})
export class BooksModule {}
