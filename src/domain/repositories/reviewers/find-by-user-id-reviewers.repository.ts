import { ReviewerModel } from '@models/reviewer.model';

export interface IFindByUserIdReviewersRepository {
  findByUserId(userId: string): Promise<ReviewerModel | undefined>;
}
