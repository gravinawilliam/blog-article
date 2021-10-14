import { SubjectModel } from '@models/subject.model';

import { Either } from '@shared/utils/either';

export interface IFindByIdSubjectsRepository {
  findById(subjectId: string): Promise<Either<undefined, SubjectModel>>;
}
