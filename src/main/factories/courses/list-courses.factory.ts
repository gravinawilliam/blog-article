import { ListCoursesController } from '@application/controllers/courses/list-courses.controller';
import { ListCoursesUseCase } from '@application/use-cases/courses/list-courses.usecase';

import CoursesTypeormRepository from '@infra/database/typeorm/repositories/courses-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeListCoursesController = (): IController => {
  const coursesRepository = new CoursesTypeormRepository();
  const listCoursesUseCase = new ListCoursesUseCase(coursesRepository);
  return new ListCoursesController(listCoursesUseCase);
};
