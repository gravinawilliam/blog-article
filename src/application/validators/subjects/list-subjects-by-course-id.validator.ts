import { IFindByIdCoursesRepository } from '@domain/repositories/courses/find-by-id-courses.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IListSubjectsByCourseIdValidator } from '@domain/validators/subjects/list-subjects-by-course-id.validator';

import { ListSubjectsByCourseIdValidatorDTO } from '@dtos/subjects/list-subjects-by-course-id.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { notFound } from '@shared/utils/http-response';

export class ListSubjectsByCourseIdValidator
  implements IListSubjectsByCourseIdValidator
{
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly courseRepository: IFindByIdCoursesRepository,
  ) {}

  public async execute({
    courseId,
  }: ListSubjectsByCourseIdValidatorDTO.Params): ListSubjectsByCourseIdValidatorDTO.Result {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [courseId],
      fieldNames: ['course_id'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const course = await this.courseRepository.findById(courseId);
    if (course.isLeft()) {
      return left(notFound(new NotFoundModelError('course')));
    }

    return right();
  }
}
