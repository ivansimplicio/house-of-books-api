import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAddresses1657625621663 implements MigrationInterface {
  tableName = 'addresses';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'identity'
        },
        {
          name: 'street',
          type: 'varchar(100)',
          isNullable: false
        },
        {
          name: 'number',
          type: 'varchar(10)',
          isNullable: true
        },
        {
          name: 'district',
          type: 'varchar(30)',
          isNullable: false
        },
        {
          name: 'zip_code',
          type: 'varchar(20)',
          isNullable: false
        },
        {
          name: 'city',
          type: 'varchar(50)',
          isNullable: false
        },
        {
          name: 'state',
          type: 'varchar(50)',
          isNullable: false
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false
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
      ],
      foreignKeys: [
        {
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
