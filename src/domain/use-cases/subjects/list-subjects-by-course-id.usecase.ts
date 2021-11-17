import { ListSubjectsByCourseIdUseCaseDTO } from '@dtos/subjects/list-subjects-by-course-id.dto';

export interface IListSubjectsByCourseIdUseCase {
  execute(
    params: ListSubjectsByCourseIdUseCaseDTO.Params,
  ): ListSubjectsByCourseIdUseCaseDTO.Result;
}
