import { getRepository, Repository } from 'typeorm';

import { ICreateCourseRepository } from '@domain/repositories/courses/create-course.repository';
import { IFindAllCoursesRepository } from '@domain/repositories/courses/find-all-courses.repository';
import { IFindByIdCoursesRepository } from '@domain/repositories/courses/find-by-id-courses.repository';

import { IRequestCreateCourseRepositoryDTO } from '@dtos/courses/create-course.dto';

import { CourseModel } from '@models/course.model';

import { Either, right, left } from '@shared/utils/either';

import { IFindByNameCoursesRepository } from '../../../../domain/repositories/courses/find-by-name-courses-repository';
import { CourseEntity } from '../entities/course.entity';

export default class CoursesTypeormRepository
  implements
    ICreateCourseRepository,
    IFindByNameCoursesRepository,
    IFindByIdCoursesRepository,
    IFindAllCoursesRepository
{
  private ormRepository: Repository<CourseEntity>;

  constructor() {
    this.ormRepository = getRepository(CourseEntity);
  }

  public async create(
    course: IRequestCreateCourseRepositoryDTO,
  ): Promise<CourseModel> {
    const courseCreated = this.ormRepository.create(course);
    await this.ormRepository.save(courseCreated);
    return courseCreated;
  }

  public async findAll(): Promise<CourseModel[]> {
    const found = await this.ormRepository.find();
    return found;
  }

  public async findByName(
    name: string,
  ): Promise<Either<undefined, CourseModel>> {
    const courseFound = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    if (courseFound === undefined) return left(undefined);
    return right(courseFound);
  }

  public async findById(
    courseId: string,
  ): Promise<Either<undefined, CourseModel>> {
    const found = await this.ormRepository.findOne(courseId);
    if (found === undefined) return left(undefined);
    return right(found);
  }
}
