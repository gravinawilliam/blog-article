import { CourseModel } from '../../models/course.model';

export interface IListCoursesUseCase {
  execute(): Promise<CourseModel[]>;
}
