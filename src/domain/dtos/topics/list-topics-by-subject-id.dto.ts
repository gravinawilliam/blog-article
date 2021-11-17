import { TopicModel } from '@models/topic.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace ListTopicsBySubjectIdUseCaseDTO {
  export type Params = {
    subjectId: string;
  };
  export type Result = Promise<{
    topics: TopicModel[];
  }>;
}

export namespace ListTopicsBySubjectIdValidatorDTO {
  export type Params = {
    subjectId: string;
  };
  export type Result = Promise<Either<IHttpResponse, void>>;
}
