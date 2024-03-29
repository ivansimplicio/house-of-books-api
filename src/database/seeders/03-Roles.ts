import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from './../../modules/roles/entities/role.entity';

export default class SeedRoles implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { role: 'ADMIN' },
        { role: 'CLIENT' }
      ])
      .execute();
  }
}
