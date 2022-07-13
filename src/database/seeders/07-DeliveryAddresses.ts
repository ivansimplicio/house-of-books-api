import { DeliveryAddress } from '../../modules/delivery-addresses/entities/delivery-address.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class SeedDeliveryAddresses implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(DeliveryAddress)
      .values([
        {
          id: 1,
          street: 'Rua dos Bobos',
          number: '0',
          district: 'Centro',
          zipCode: '56999000',
          city: 'Bangu',
          state: 'Rio de Janeiro',
          orderId: 1
        },
        {
          id: 2,
          street: 'Rua Juscelino Kubitschek',
          number: '126',
          district: 'Centro',
          zipCode: '54623201',
          city: 'Salvador',
          state: 'Bahia',
          orderId: 2
        }
      ])
      .execute();
  }
}
