import { OrderItem } from '../../modules/order-items/entities/order-item.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class SeedOrderItems implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(OrderItem)
      .values([
        {
          quantity: 1,
          discount: 0.1,
          amount: 62.91,
          bookId: 1,
          orderId: 1
        },
        {
          quantity: 1,
          discount: 0.1,
          amount: 62.91,
          bookId: 2,
          orderId: 1
        },
        {
          quantity: 2,
          discount: 0.2,
          amount: 79.84,
          bookId: 3,
          orderId: 2
        }
      ])
      .execute();
  }
}
