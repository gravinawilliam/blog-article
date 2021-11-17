import { getRepository, Repository } from 'typeorm';

import { ICreateSubjectRepository } from '@domain/repositories/subjects/create-subject.repository';
import { IFindAllSubjectsRepository } from '@domain/repositories/subjects/find-all-subjects.repository';
import { IFindByNameSubjectsRepository } from '@domain/repositories/subjects/find-by-name-subjects.repository';
import { IFindSubjectsByCourseIdRepository } from '@domain/repositories/subjects/find-subjects-by-course-id.repository';

import { IRequestCreateSubjectUseCaseDTO } from '@dtos/subjects/create-subject.dto';
import { FindSubjectsByCourseIdRepositoryDTO } from '@dtos/subjects/subjects-repository.dto';

import { SubjectModel } from '@models/subject.model';

import { Either, left, right } from '@shared/utils/either';

import { IFindByIdSubjectsRepository } from '../../../../domain/repositories/subjects/find-by-id-subjects.repository';
import { SubjectEntity } from '../entities/subject.entity';

export default class SubjectsTypeormRepository
  implements
    ICreateSubjectRepository,
    IFindByNameSubjectsRepository,
    IFindAllSubjectsRepository,
    IFindByIdSubjectsRepository,
    IFindSubjectsByCourseIdRepository
{
  private ormRepository: Repository<SubjectEntity>;

  constructor() {
    this.ormRepository = getRepository(SubjectEntity);
  }

  public async create(
    params: IRequestCreateSubjectUseCaseDTO,
  ): Promise<SubjectModel> {
    const created = this.ormRepository.create(params);
    await this.ormRepository.save(created);
    return created;
  }

  public async findAll(): Promise<SubjectModel[]> {
    return await this.ormRepository.find();
  }

  public async findByCourseId({
    courseId,
  }: FindSubjectsByCourseIdRepositoryDTO.Params): FindSubjectsByCourseIdRepositoryDTO.Result {
    return await this.ormRepository.find({
      where: { courseId },
    });
  }

  public async findById(
    subjectId: string,
  ): Promise<Either<undefined, SubjectModel>> {
    const found = await this.ormRepository.findOne({
      where: { id: subjectId },
    });
    if (found === undefined) return left(found as undefined);
    return right(found);
  }

  public async findByName(
    name: string,
  ): Promise<Either<undefined, SubjectModel>> {
    const found = await this.ormRepository.findOne({
      where: { name },
    });
    if (found === undefined) return left(found as undefined);
    return right(found);
  }
}
