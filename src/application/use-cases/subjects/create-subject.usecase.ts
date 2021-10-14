import { ICreateSubjectRepository } from '@domain/repositories/subjects/create-subject.repository';
import { ICreateSubjectUseCase } from '@domain/use-cases/subjects/create-subject.usecase';

import { IRequestCreateSubjectUseCaseDTO } from '@dtos/subjects/create-subject.dto';

import { SubjectModel } from '@models/subject.model';

export class CreateSubjectUseCase implements ICreateSubjectUseCase {
  constructor(private readonly subjectsRepository: ICreateSubjectRepository) {}

  public async execute({
    courseId,
    name,
  }: IRequestCreateSubjectUseCaseDTO): Promise<SubjectModel> {
    const subject = await this.subjectsRepository.create({
      name,
      courseId,
    });

    return subject;
  }
}
