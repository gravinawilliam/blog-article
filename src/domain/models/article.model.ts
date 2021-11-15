import { BaseModel } from './_base.model';
import { TopicModel } from './topic.model';
import { UserModel } from './user.model';

export class ArticleModel extends BaseModel {
  title: string;

  content: string;

  thumbnail: string;

  status: string;

  description: string;

  authorId: string;

  reviewerId: string;

  reviewer: UserModel;

  author: UserModel;

  topics: TopicModel[];
}
