import { CreateReviewerUseCaseDTO } from '@dtos/reviewers/create-reviewer.dto';

export interface ICreateReviewerUseCase {
  execute(
    params: CreateReviewerUseCaseDTO.Params,
  ): Promise<CreateReviewerUseCaseDTO.Result>;
}
