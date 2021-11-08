import { CreateReviewerRepositoryDTO } from '@dtos/reviewers/create-reviewer.dto';

export interface ICreateReviewerRepository {
  create(
    params: CreateReviewerRepositoryDTO.Params,
  ): Promise<CreateReviewerRepositoryDTO.Result>;
}
