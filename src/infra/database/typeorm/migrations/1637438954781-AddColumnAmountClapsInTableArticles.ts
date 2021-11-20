import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnAmountClapsInTableArticles1637438954781
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'articles',
      new TableColumn({
        name: 'amount_claps',
        type: 'integer',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('articles', 'amount_claps');
  }
}
