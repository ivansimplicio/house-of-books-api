import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Address } from './../../modules/addresses/entities/address.entity';

export default class SeedAddresses implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    const ids = [
      'd54ca0a1-53e4-44dd-afc6-e1cc77cc9399',
      'a62c363c-0e97-425a-829e-302d1fb2c31c'
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Address)
      .values([
        { 
          street: 'Rua dos Bobos',
          number: '0',
          district: 'Centro',
          zipCode: '56999000',
          city: 'Bangu',
          state: 'Rio de Janeiro',
          userId: `${ids[0]}`
        },
        { 
          street: 'Rua Juscelino Kubitschek',
          number: '126',
          district: 'Centro',
          zipCode: '54623201',
          city: 'Salvador',
          state: 'Bahia',
          userId: `${ids[1]}`
        },
        { 
          street: 'Rua Treze de Maio',
          number: '12b',
          district: 'Centro',
          zipCode: '54986253',
          city: 'Acrelândia',
          state: 'Acre',
          userId: `${ids[1]}`
        },
      ])
      .execute();
  }
}