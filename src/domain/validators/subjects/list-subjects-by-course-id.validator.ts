import { ListSubjectsByCourseIdValidatorDTO } from '@dtos/subjects/list-subjects-by-course-id.dto';

export interface IListSubjectsByCourseIdValidator {
  execute(
    params: ListSubjectsByCourseIdValidatorDTO.Params,
  ): ListSubjectsByCourseIdValidatorDTO.Result;
}
