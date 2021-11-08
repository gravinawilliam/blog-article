import { CreateReviewerValidatorDTO } from '@dtos/reviewers/create-reviewer.dto';

export interface ICreateReviewerValidator {
  execute(
    params: CreateReviewerValidatorDTO.Params,
  ): Promise<CreateReviewerValidatorDTO.Result>;
}
