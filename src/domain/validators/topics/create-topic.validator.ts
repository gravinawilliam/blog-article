import { IRequestCreateTopicValidatorDTO } from '@dtos/topics/create-topic.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateTopicValidator {
  execute(
    params: IRequestCreateTopicValidatorDTO,
  ): Promise<Either<IHttpResponse, boolean>>;
}
