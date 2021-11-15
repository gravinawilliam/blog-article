import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { ReviewerModel } from '@models/reviewer.model';

import { BaseEntity } from './_base.entity';
import { UserEntity } from './user.entity';

@Entity('reviewers')
export class ReviewerEntity extends BaseEntity implements ReviewerModel {
  @Column()
  userId: string;

  @Column()
  reviewerStatus: string;

  @Column()
  reviewingArticles: number;

  @OneToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;
}
