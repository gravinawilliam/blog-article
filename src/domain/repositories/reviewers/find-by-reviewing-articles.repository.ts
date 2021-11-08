import { ReviewerModel } from '@models/reviewer.model';

export interface IFindByReviewingArticlesReviewersRepository {
  findBySmaller(): Promise<ReviewerModel>;
}
