import { Entity, Column } from 'typeorm';

import { ArticleTopicModel } from '@models/article-topic.model';

import { BaseEntity } from './_base.entity';

@Entity('articles')
export class ArticleTopicEntity
  extends BaseEntity
  implements ArticleTopicModel
{
  @Column()
  articleId: string;

  @Column()
  topicId: string;
}
