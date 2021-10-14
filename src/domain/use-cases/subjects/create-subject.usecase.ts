import { IRequestCreateSubjectUseCaseDTO } from '@dtos/subjects/create-subject.dto';

import { SubjectModel } from '@models/subject.model';

export interface ICreateSubjectUseCase {
  execute(params: IRequestCreateSubjectUseCaseDTO): Promise<SubjectModel>;
}
