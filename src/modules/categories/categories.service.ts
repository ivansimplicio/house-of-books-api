import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CategoryInput } from './dto/category.input';
import { Category } from './entities/category.entity';

type Query = {
  where: any
}

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  async create(data: CategoryInput): Promise<Category> {
    const query = { where: { name: data.name } };
    await this.findCategoryByQuery(query);
    return this.categoriesRepository.save(data);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id }, relations: ['books'] });
    if(!category){
      throw new NotFoundException('Category not found.');
    }
    return category;
  }

  async update(id: number, data: CategoryInput): Promise<Category> {
    const category = await this.findOne(id);
    const query = { where: { name: data.name, id: Not(id) }};
    await this.findCategoryByQuery(query);
    return this.categoriesRepository.save({ ...category, ...data });
  }

  async remove(id: number): Promise<boolean>  {
    const category = await this.findOne(id);
    const deletedCategory = await this.categoriesRepository.remove(category);
    return deletedCategory ? true : false;
  }

  private async findCategoryByQuery(query: Query): Promise<void> {
    const category = await this.categoriesRepository.findOne(query);
    if(category){
      throw new UnprocessableEntityException('This category is already registered.');
    }
  }
}
