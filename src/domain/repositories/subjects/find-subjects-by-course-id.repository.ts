import { FindSubjectsByCourseIdRepositoryDTO } from '@dtos/subjects/subjects-repository.dto';

export interface IFindSubjectsByCourseIdRepository {
  findByCourseId(
    params: FindSubjectsByCourseIdRepositoryDTO.Params,
  ): FindSubjectsByCourseIdRepositoryDTO.Result;
}
