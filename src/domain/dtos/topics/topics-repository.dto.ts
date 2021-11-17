import { TopicModel } from '@models/topic.model';

export namespace FindTopicsBySubjectIdRepositoryDTO {
  export type Params = {
    subjectId: string;
  };
  export type Result = Promise<TopicModel[]>;
}
