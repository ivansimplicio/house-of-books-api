import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBooks1657055633505 implements MigrationInterface {
  tableName = 'books';

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
          name: 'title',
          type: 'varchar(50)',
          isNullable: false
        },
        {
          name: 'subtitle',
          type: 'varchar(80)',
          isNullable: true
        },
        {
          name: 'description',
          type: 'varchar(255)',
          isNullable: true
        },
        {
          name: 'isbn',
          type: 'varchar(30)',
          isNullable: false,
          isUnique: true
        },
        {
          name: 'author',
          type: 'varchar(80)',
          isNullable: false
        },
        {
          name: 'publishing_company',
          type: 'varchar(30)',
          isNullable: false
        },
        {
          name: 'language',
          type: 'varchar(20)',
          isNullable: false
        },
        {
          name: 'release_date',
          type: 'timestamp',
          isNullable: true
        },
        {
          name: 'cover_type',
          type: 'varchar(20)',
          isNullable: true
        },
        {
          name: 'number_of_pages',
          type: 'int',
          isNullable: false
        },
        {
          name: 'value',
          type: 'float',
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
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
