import { ListTopicsBySubjectIdValidatorDTO } from '@dtos/topics/list-topics-by-subject-id.dto';

export interface IListTopicsBySubjectIdValidator {
  execute(
    params: ListTopicsBySubjectIdValidatorDTO.Params,
  ): ListTopicsBySubjectIdValidatorDTO.Result;
}
