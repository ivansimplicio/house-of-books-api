import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './models/category.model';
import { CategoryInput } from './dto/category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  async createCategory(@Args('data') data: CategoryInput): Promise<Category> {
    return this.categoriesService.create(data);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('id') id: number, @Args('data') data: CategoryInput): Promise<Category> {
    return this.categoriesService.update(id, data);
  }

  @Mutation(() => Boolean)
  async removeCategory(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.categoriesService.remove(id);
  }
}
