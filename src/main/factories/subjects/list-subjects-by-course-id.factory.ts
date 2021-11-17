import { ListSubjectsByCourseIdController } from '@application/controllers/subjects/list-subjects-by-course-id.controller';
import { ListSubjectsByCourseIdUseCase } from '@application/use-cases/subjects/list-subjects-by-course-id.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { ListSubjectsByCourseIdValidator } from '@application/validators/subjects/list-subjects-by-course-id.validator';

import CoursesTypeormRepository from '@infra/database/typeorm/repositories/courses-typeorm.repository';
import SubjectsTypeormRepository from '@infra/database/typeorm/repositories/subjects-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeListSubjectsByCourseIdController = (): IController => {
  const subjectsRepository = new SubjectsTypeormRepository();
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const coursesRepository = new CoursesTypeormRepository();
  const listSubjectsByCourseIdValidator = new ListSubjectsByCourseIdValidator(
    requiredFieldsValidator,
    coursesRepository,
  );
  const listSubjectsByCourseIdUseCase = new ListSubjectsByCourseIdUseCase(
    subjectsRepository,
  );
  return new ListSubjectsByCourseIdController(
    listSubjectsByCourseIdValidator,
    listSubjectsByCourseIdUseCase,
  );
};
