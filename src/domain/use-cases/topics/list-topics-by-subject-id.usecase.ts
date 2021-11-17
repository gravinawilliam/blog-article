import { ListTopicsBySubjectIdUseCaseDTO } from '@dtos/topics/list-topics-by-subject-id.dto';

export interface IListTopicsBySubjectIdUseCase {
  execute(
    params: ListTopicsBySubjectIdUseCaseDTO.Params,
  ): ListTopicsBySubjectIdUseCaseDTO.Result;
}
