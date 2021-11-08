import { TopicModel } from '@models/topic.model';

import { Either } from '@shared/utils/either';

export interface IFindByNameTopicsRepository {
  findByName(name: string): Promise<Either<undefined, TopicModel>>;
}
