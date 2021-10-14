import { BaseModel } from './_base.model';

export class ArticleModel extends BaseModel {
  title: string;

  contentUrl: string;

  thumbnailUrl: string;

  authorId: string;

  reviewerId: string;

  status: string;
}
