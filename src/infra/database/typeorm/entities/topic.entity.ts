import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { ArticleModel } from '@models/article.model';
import { SubjectModel } from '@models/subject.model';
import { TopicModel } from '@models/topic.model';

import { BaseEntity } from './_base.entity';
import { ArticleEntity } from './article.entity';
import { SubjectEntity } from './subject.entity';

@Entity('topics')
export class TopicEntity extends BaseEntity implements TopicModel {
  @Column()
  name: string;

  @Column()
  subjectId: string;

  @ManyToOne(() => SubjectEntity, (subject) => subject.topics)
  subject: SubjectModel;

  @ManyToMany(() => ArticleEntity, {})
  @JoinTable({
    name: 'articles_topics',
    joinColumns: [{ name: 'topic_id' }],
    inverseJoinColumns: [{ name: 'article_id' }],
  })
  articles: ArticleModel[];
}
