import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnDescriptionInTableArticles1635951033693
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'articles',
      new TableColumn({
        name: 'description',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('articles', 'description');
  }
}
