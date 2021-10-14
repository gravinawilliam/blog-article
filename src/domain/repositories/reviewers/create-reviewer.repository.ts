import { ICreateReviewerDTO } from '@dtos/reviewers/create-reviewer.dto';

import { ReviewerModel } from '@models/reviewer.model';

export interface ICreateReviewerRepository {
  create(params: ICreateReviewerDTO): Promise<ReviewerModel>;
}
