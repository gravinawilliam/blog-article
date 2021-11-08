import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableArticlesTopics1634170123783
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles_topics',
        columns: [
          {
            name: 'article_id',
            type: 'uuid',
          },
          {
            name: 'topic_id',
            type: 'uuid',
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
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'ArticleIdInArticles',
            columnNames: ['article_id'],
            referencedTableName: 'articles',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'TopicIdInTopics',
            columnNames: ['topic_id'],
            referencedTableName: 'topics',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles_topics');
  }
}
