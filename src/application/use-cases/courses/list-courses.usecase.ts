import { IFindAllCoursesRepository } from '@domain/repositories/courses/find-all-courses.repository';
import { IListCoursesUseCase } from '@domain/use-cases/courses/list-courses.usecase';

import { CourseModel } from '@models/course.model';

export class ListCoursesUseCase implements IListCoursesUseCase {
  constructor(private readonly coursesRepository: IFindAllCoursesRepository) {}

  public async execute(): Promise<CourseModel[]> {
    return await this.coursesRepository.findAll();
  }
}
