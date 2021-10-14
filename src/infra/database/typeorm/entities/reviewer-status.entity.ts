import { Entity, Column, OneToMany } from 'typeorm';

import { ReviewerStatusModel } from '@models/reviewer-status.model';
import { ReviewerModel } from '@models/reviewer.model';

import { BaseEntity } from './_base.entity';
import { ReviewerEntity } from './reviewer.entity';

@Entity('reviewer_status')
export class ReviewerStatusEntity
  extends BaseEntity
  implements ReviewerStatusModel
{
  @Column()
  description: string;

  @OneToMany(() => ReviewerEntity, (reviewer) => reviewer.reviewerStatus)
  reviewers: ReviewerModel[];
}
