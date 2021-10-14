import { IResponseCreateReviewerTransformerDTO } from '@dtos/reviewers/create-reviewer.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateReviewerTransformer {
  execute(): Promise<
    Either<IHttpResponse, IResponseCreateReviewerTransformerDTO>
  >;
}
