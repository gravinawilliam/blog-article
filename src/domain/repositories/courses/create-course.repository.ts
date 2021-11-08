import { IRequestCreateCourseRepositoryDTO } from '@dtos/courses/create-course.dto';

import { CourseModel } from '@models/course.model';

export interface ICreateCourseRepository {
  create(course: IRequestCreateCourseRepositoryDTO): Promise<CourseModel>;
}
