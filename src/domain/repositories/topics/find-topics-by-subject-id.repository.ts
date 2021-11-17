import { FindTopicsBySubjectIdRepositoryDTO } from '@dtos/topics/topics-repository.dto';

export interface IFindTopicsBySubjectIdRepository {
  findBySubjectId(
    params: FindTopicsBySubjectIdRepositoryDTO.Params,
  ): FindTopicsBySubjectIdRepositoryDTO.Result;
}
