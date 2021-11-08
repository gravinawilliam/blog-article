import { CourseModel } from '@models/course.model';

import { Either } from '@shared/utils/either';

export interface IFindByNameCoursesRepository {
  findByName(name: string): Promise<Either<undefined, CourseModel>>;
}
