import { Order } from './../../modules/orders/entities/order.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class SeedOrders implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    const ids = [
      'd54ca0a1-53e4-44dd-afc6-e1cc77cc9399',
      'a62c363c-0e97-425a-829e-302d1fb2c31c'
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values([
        {
          id: 1,
          amount: 125.82,
          userId: `${ids[0]}`
        },
        {
          id: 2,
          amount: 79.84,
          userId: `${ids[1]}`
        }
      ])
      .execute();
  }
}