import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBooksCategories1657128256790 implements MigrationInterface {
  tableName = 'books_categories';

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
          name: 'book_id',
          type: 'int',
          isNullable: false
        },
        {
          name: 'category_id',
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
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        },
        {
          columnNames: ['category_id'],
          referencedTableName: 'categories',
          referencedColumnNames: ['id']
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
