import { BaseModel } from '@models/_base.model';

import { ReviewerStatusModel } from './reviewer-status.model';

export class ReviewerModel extends BaseModel {
  userId: string;

  reviewerStatusId: string;

  reviewingArticles: number;

  reviewerStatus: ReviewerStatusModel;
}
