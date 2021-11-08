import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

import { TopicModel } from '../../models/topic.model';

export interface IFindByIdsTopicsRepository {
  findByIds(topicIds: string[]): Promise<Either<IHttpResponse, TopicModel[]>>;
}
