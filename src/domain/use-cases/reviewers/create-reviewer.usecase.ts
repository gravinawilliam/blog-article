import { IRequestCreateReviewerUseCaseDTO } from '@dtos/reviewers/create-reviewer.dto';

export interface ICreateReviewerUseCase {
  execute(params: IRequestCreateReviewerUseCaseDTO): Promise<void>;
}
