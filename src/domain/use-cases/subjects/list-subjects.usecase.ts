import { SubjectModel } from '@models/subject.model';

export interface IListSubjectsUseCase {
  execute(): Promise<SubjectModel[]>;
}
