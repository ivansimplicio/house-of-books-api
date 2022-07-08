import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRoles1657284043563 implements MigrationInterface {
  tableName = 'roles';

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
          name: 'role',
          type: 'varchar(15)',
          isNullable: false,
          isUnique: true
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