import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from './../../modules/users/entities/user.entity';

import * as bcrypt from 'bcryptjs';

export default class SeedUsers implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    const ids = [
      '82816389-0cbd-4a77-9099-8b8d348aeda7',
      'd54ca0a1-53e4-44dd-afc6-e1cc77cc9399',
      'a62c363c-0e97-425a-829e-302d1fb2c31c'
    ];
    
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { 
          id: ids[0],
          name: 'Admin',
          email: 'admin@email.com',
          password: bcrypt.hashSync('password123', 8),
          cpf: '47269159084',
          phoneNumber: '9988887777',
        },
        { 
          id: ids[1],
          name: 'Ivan',
          email: 'ivan@email.com',
          password: bcrypt.hashSync('password123', 8),
          cpf: '01681586045',
          phoneNumber: '8877774444',
        },
        { 
          id: ids[2],
          name: 'José',
          email: 'jose@email.com',
          password: bcrypt.hashSync('password123', 8),
          cpf: '26446885075',
          phoneNumber: '5566664444',
        }
      ])
      .execute();
    
    await connection.query(
      `INSERT INTO users_roles (user_id, role_id) VALUES `
      +`('${ids[0]}', 1),`
      +`('${ids[1]}', 1),`
      +`('${ids[1]}', 2),`
      +`('${ids[2]}', 2);`);
  }
}
