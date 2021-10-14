import { IFindAllSubjectsRepository } from '@domain/repositories/subjects/find-all-subjects.repository';
import { IListSubjectsUseCase } from '@domain/use-cases/subjects/list-subjects.usecase';

import { SubjectModel } from '@models/subject.model';

export class ListSubjectsUseCase implements IListSubjectsUseCase {
  constructor(
    private readonly subjectsRepository: IFindAllSubjectsRepository,
  ) {}

  public async execute(): Promise<SubjectModel[]> {
    const subjects = await this.subjectsRepository.findAll();
    return subjects;
  }
}
