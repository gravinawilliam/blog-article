import {
  IRequestCreateCourseUseCaseDTO,
  IResponseCreateCourseUseCaseDTO,
} from '@dtos/courses/create-course.dto';

export interface ICreateCourseUseCase {
  execute(
    createCourse: IRequestCreateCourseUseCaseDTO,
  ): Promise<IResponseCreateCourseUseCaseDTO>;
}
