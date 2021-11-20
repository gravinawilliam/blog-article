import { Entity, Column } from 'typeorm';

import { ArticleClapUserModel } from '@models/article-clap-user.model';

import { BaseEntity } from './_base.entity';

@Entity('articles_clap_users')
export class ArticleClapUserEntity
  extends BaseEntity
  implements ArticleClapUserModel
{
  @Column()
  articleId: string;

  @Column()
  userId: string;
}
