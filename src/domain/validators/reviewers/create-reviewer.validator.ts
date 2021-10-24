import {
  IRequestCreateReviewerValidatorDTO,
  IResponseCreateReviewerValidatorDTO,
} from '@dtos/reviewers/create-reviewer.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateReviewerValidator {
  execute(
    params: IRequestCreateReviewerValidatorDTO,
  ): Promise<Either<IHttpResponse, IResponseCreateReviewerValidatorDTO>>;
}