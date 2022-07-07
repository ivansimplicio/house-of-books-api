import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Category } from './../../modules/categories/entities/category.entity';

export default class SeedCategories implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        { name: 'Design e UX' },
        { name: 'Marketing Digital' },
        { name: 'Lógica de Programação' },
        { name: 'Games' }
      ])
      .execute();
  }
}
