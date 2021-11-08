import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorColumnContentinTableArticles1635374995768
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('articles', 'content_url', 'content');
    await queryRunner.renameColumn('articles', 'thumbnail_url', 'thumbnail');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('articles', 'content', 'content_url');
    await queryRunner.renameColumn('articles', 'thumbnail', 'thumbnail_url');
  }
}
