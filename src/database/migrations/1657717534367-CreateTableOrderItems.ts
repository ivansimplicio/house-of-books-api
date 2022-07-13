import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOrderItems1657717534367 implements MigrationInterface {
  tableName = 'order_items';

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
          name: 'quantity',
          type: 'int',
          isNullable: false
        },
        {
          name: 'discount',
          type: 'float',
          isNullable: false
        },
        {
          name: 'amount',
          type: 'float',
          isNullable: false
        },
        {
          name: 'book_id',
          type: 'int',
          isNullable: false
        },
        {
          name: 'order_id',
          type: 'int',
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
          columnNames: ['book_id'],
          referencedTableName: 'books',
          referencedColumnNames: ['id']
        },
        {
          columnNames: ['order_id'],
          referencedTableName: 'orders',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
