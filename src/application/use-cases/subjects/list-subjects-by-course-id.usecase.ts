import { IFindSubjectsByCourseIdRepository } from '@domain/repositories/subjects/find-subjects-by-course-id.repository';
import { IListSubjectsByCourseIdUseCase } from '@domain/use-cases/subjects/list-subjects-by-course-id.usecase';

import { ListSubjectsByCourseIdUseCaseDTO } from '@dtos/subjects/list-subjects-by-course-id.dto';

export class ListSubjectsByCourseIdUseCase
  implements IListSubjectsByCourseIdUseCase
{
  constructor(
    private readonly subjectsRepository: IFindSubjectsByCourseIdRepository,
  ) {}

  public async execute({
    courseId,
  }: ListSubjectsByCourseIdUseCaseDTO.Params): ListSubjectsByCourseIdUseCaseDTO.Result {
    const subjects = await this.subjectsRepository.findByCourseId({
      courseId,
    });

    return {
      subjects,
    };
  }
}
