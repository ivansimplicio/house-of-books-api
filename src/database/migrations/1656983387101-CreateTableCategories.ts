import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCategories1656983387101 implements MigrationInterface {
	tableName = 'categories';

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
					name: 'name',
					type: 'varchar(50)',
					isNullable: false,
					isUnique: true
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()',
				},
				{
					name: 'updated_at',
					type: 'timestamp',
					default: 'now()',
				},
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.tableName);
	}
}
