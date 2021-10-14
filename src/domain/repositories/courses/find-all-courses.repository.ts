import { CourseModel } from '@models/course.model';

export interface IFindAllCoursesRepository {
  findAll(): Promise<CourseModel[]>;
}
