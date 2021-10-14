import { BaseModel } from '@models/_base.model';

import { ReviewerModel } from './reviewer.model';

export class ReviewerStatusModel extends BaseModel {
  description: string;

  reviewers: ReviewerModel[];
}
