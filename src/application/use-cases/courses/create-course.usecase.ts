import { ICreateCourseRepository } from '@domain/repositories/courses/create-course.repository';
import { ICreateCourseUseCase } from '@domain/use-cases/courses/create-course.usecase';

import {
  IRequestCreateCourseUseCaseDTO,
  IResponseCreateCourseUseCaseDTO,
} from '@dtos/courses/create-course.dto';

export class CreateCourseUseCase implements ICreateCourseUseCase {
  constructor(private readonly coursesRepository: ICreateCourseRepository) {}

  public async execute({
    name,
  }: IRequestCreateCourseUseCaseDTO): Promise<IResponseCreateCourseUseCaseDTO> {
    const { id } = await this.coursesRepository.create({
      name,
    });

    return {
      id,
      name,
    };
  }
}
