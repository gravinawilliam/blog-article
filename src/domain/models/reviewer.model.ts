import { BaseModel } from '@models/_base.model';

export class ReviewerModel extends BaseModel {
  userId: string;

  reviewingArticles: number;

  reviewerStatus: string;
}
