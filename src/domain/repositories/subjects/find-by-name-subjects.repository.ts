import { SubjectModel } from '@models/subject.model';

import { Either } from '@shared/utils/either';

export interface IFindByNameSubjectsRepository {
  findByName(name: string): Promise<Either<undefined, SubjectModel>>;
}
