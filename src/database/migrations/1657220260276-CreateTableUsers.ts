import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1657220260276 implements MigrationInterface {
  tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar(50)',
          isNullable: false
        },
        {
          name: 'email',
          type: 'varchar(50)',
          isNullable: false,
          isUnique: true
        },
        {
          name: 'password',
          type: 'varchar(200)',
          isNullable: false
        },
        {
          name: 'cpf',
          type: 'varchar(15)',
          isNullable: false,
          isUnique: true
        },
        {
          name: 'phone_number',
          type: 'varchar(30)',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
