import { IRequestCreateCourseValidatorDTO } from '@dtos/courses/create-course.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateCourseValidator {
  execute(
    createOwner: IRequestCreateCourseValidatorDTO,
  ): Promise<Either<IHttpResponse, boolean>>;
}
