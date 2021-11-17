import { SubjectModel } from '@models/subject.model';

export namespace FindSubjectsByCourseIdRepositoryDTO {
  export type Params = {
    courseId: string;
  };
  export type Result = Promise<SubjectModel[]>;
}
