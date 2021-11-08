import { IRequestCreateTopicUseCaseDTO } from '@dtos/topics/create-topic.dto';

import { TopicModel } from '@models/topic.model';

export interface ICreateTopicUseCase {
  execute(params: IRequestCreateTopicUseCaseDTO): Promise<TopicModel>;
}
