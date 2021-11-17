import { SubjectModel } from '@models/subject.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace ListSubjectsByCourseIdUseCaseDTO {
  export type Params = {
    courseId: string;
  };
  export type Result = Promise<{
    subjects: SubjectModel[];
  }>;
}

export namespace ListSubjectsByCourseIdValidatorDTO {
  export type Params = {
    courseId: string;
  };
  export type Result = Promise<Either<IHttpResponse, void>>;
}
