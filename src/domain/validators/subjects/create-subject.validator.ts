import { IRequestCreateSubjectValidatorDTO } from '@dtos/subjects/create-subject.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateSubjectValidator {
  execute(
    params: IRequestCreateSubjectValidatorDTO,
  ): Promise<Either<IHttpResponse, boolean>>;
}
