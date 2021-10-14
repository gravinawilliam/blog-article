import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { ArticleModel } from '@models/article.model';
import { TopicModel } from '@models/topic.model';

import { BaseEntity } from './_base.entity';
import { TopicEntity } from './topic.entity';

@Entity('articles')
export class ArticleEntity extends BaseEntity implements ArticleModel {
  @Column()
  title: string;

  @Column()
  contentUrl: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  authorId: string;

  @Column()
  reviewerId: string;

  @Column()
  status: string;

  @ManyToMany(() => TopicEntity, {})
  @JoinTable({
    name: 'articles_topics',
    joinColumns: [{ name: 'article_id' }],
    inverseJoinColumns: [{ name: 'topic_id' }],
  })
  topics: TopicModel[];
}
