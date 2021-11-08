import { CourseModel } from '@models/course.model';

import { Either } from '@shared/utils/either';

export interface IFindByIdCoursesRepository {
  findById(courseId: string): Promise<Either<undefined, CourseModel>>;
}
