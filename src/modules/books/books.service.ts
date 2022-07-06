import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) {}

  async create(data: CreateBookInput): Promise<Book> {
    const bookExists = await this.booksRepository.findOneBy({ isbn: data.isbn });
    if(bookExists){
      throw new UnprocessableEntityException('This book is already registered.');
    }
    return this.booksRepository.save(data);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if(!book){
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async update(id: number, data: UpdateBookInput): Promise<Book> {
    const book = await this.findOne(id);
    const bookExists = await this.booksRepository.find({ where: {
      id: Not(id),
      isbn: data.isbn,
    }})
    if(bookExists.length > 0){
      throw new UnprocessableEntityException('This book is already registered.')
    }
    return this.booksRepository.save({ ...book, ...data });
  }

  async remove(id: number): Promise<boolean> {
    const book = await this.findOne(id);
    const deletedBook = await this.booksRepository.remove(book);
    return deletedBook ? true : false;
  }
}