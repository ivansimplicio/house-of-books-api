import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from './../../modules/users/entities/user.entity';

import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcryptjs';

export default class SeedUsers implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    const ids = [uuidv4(), uuidv4(), uuidv4()];
    
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
