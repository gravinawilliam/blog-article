import { SubjectModel } from '@models/subject.model';

export interface IFindAllSubjectsRepository {
  findAll(): Promise<SubjectModel[]>;
}
