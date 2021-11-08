import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ArticleModel } from '@models/article.model';
import { TopicModel } from '@models/topic.model';
import { UserModel } from '@models/user.model';

import { BaseEntity } from './_base.entity';
import { TopicEntity } from './topic.entity';
import { UserEntity } from './user.entity';

@Entity('articles')
export class ArticleEntity extends BaseEntity implements ArticleModel {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  thumbnail: string;

  @Column()
  authorId: string;

  @Column()
  reviewerId: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @ManyToMany(() => TopicEntity, {})
  @JoinTable({
    name: 'articles_topics',
    joinColumns: [{ name: 'article_id' }],
    inverseJoinColumns: [{ name: 'topic_id' }],
  })
  topics: TopicModel[];

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    eager: true,
  })
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: UserModel;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn({ name: 'reviewer_id', referencedColumnName: 'id' })
  reviewer: UserModel;
}
