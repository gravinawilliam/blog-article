import { ReviewerStatusModel } from '@models/reviewer-status.model';

import { Either } from '@shared/utils/either';

export interface IFindByDescriptionReviewerStatusRepository {
  findByDescription(
    description: string,
  ): Promise<Either<undefined, ReviewerStatusModel>>;
}
