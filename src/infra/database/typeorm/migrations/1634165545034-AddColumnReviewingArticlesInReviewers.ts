import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnReviewingArticlesInReviewers1634165545034
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'reviewers',
      new TableColumn({
        name: 'reviewing_articles',
        type: 'integer',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('reviewers', 'reviewing_articles');
  }
}
