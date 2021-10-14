import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { ReviewerStatusModel } from '@models/reviewer-status.model';
import { ReviewerModel } from '@models/reviewer.model';

import { BaseEntity } from './_base.entity';
import { ReviewerStatusEntity } from './reviewer-status.entity';
import { UserEntity } from './user.entity';

@Entity('reviewers')
export class ReviewerEntity extends BaseEntity implements ReviewerModel {
  @Column()
  userId: string;

  @Column()
  reviewerStatusId: string;

  @Column()
  reviewingArticles: number;

  @OneToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(
    () => ReviewerStatusEntity,
    (reviewerStatus) => reviewerStatus.reviewers,
    {
      eager: true,
    },
  )
  reviewerStatus: ReviewerStatusModel;
}
