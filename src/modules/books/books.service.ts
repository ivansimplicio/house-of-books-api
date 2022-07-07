import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { Category } from './../categories/entities/category.entity';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>,
              @InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  async create(data: CreateBookInput): Promise<Book> {
    const bookExists = await this.booksRepository.findOneBy({ isbn: data.isbn });
    if(bookExists){
      throw new UnprocessableEntityException('This book is already registered.');
    }
    const { categories, ...book } = data;
    const categoriesFound = await this.findCategories(categories);
    return this.booksRepository.save({ ...book, categories: categoriesFound });
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['categories'] });
    if(!book){
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async update(id: number, data: UpdateBookInput): Promise<Book> {
    const bookFound = await this.findOne(id);
    const bookExists = await this.booksRepository.find({ where: {
      id: Not(id),
      isbn: data.isbn,
    }})
    if(bookExists.length > 0){
      throw new UnprocessableEntityException('This book is already registered.')
    }
    const { categories, ...bookData } = data;
    if(categories){
      const categoriesFound = await this.findCategories(categories);
      return this.booksRepository.save({ ...bookFound, ...bookData, categories: categoriesFound });
    }
    return this.booksRepository.save({ ...bookFound, ...bookData });
  }

  async remove(id: number): Promise<boolean> {
    const book = await this.findOne(id);
    const deletedBook = await this.booksRepository.remove(book);
    return deletedBook ? true : false;
  }

  private async findCategories(categoryIds: number[]): Promise<Category[]> {
    const categories: Category[] = [];
    for(let id of categoryIds){
      const category = await this.categoriesRepository.findOneBy({ id });
      if(!category){
        throw new UnprocessableEntityException(`The category informed with id=${id} does not exist.`);
      }
      categories.push(category);
    }
    return categories;
  }
}
