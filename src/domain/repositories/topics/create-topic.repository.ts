import { IRequestCreateTopicUseCaseDTO } from '@dtos/topics/create-topic.dto';

import { TopicModel } from '@models/topic.model';

export interface ICreateTopicRepository {
  create(params: IRequestCreateTopicUseCaseDTO): Promise<TopicModel>;
}
