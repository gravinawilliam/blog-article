import { IFindTopicsBySubjectIdRepository } from '@domain/repositories/topics/find-topics-by-subject-id.repository';
import { IListTopicsBySubjectIdUseCase } from '@domain/use-cases/topics/list-topics-by-subject-id.usecase';

import { ListTopicsBySubjectIdUseCaseDTO } from '@dtos/topics/list-topics-by-subject-id.dto';

export class ListTopicsBySubjectIdUseCase
  implements IListTopicsBySubjectIdUseCase
{
  constructor(
    private readonly topicsRepository: IFindTopicsBySubjectIdRepository,
  ) {}

  public async execute({
    subjectId,
  }: ListTopicsBySubjectIdUseCaseDTO.Params): ListTopicsBySubjectIdUseCaseDTO.Result {
    const topics = await this.topicsRepository.findBySubjectId({
      subjectId,
    });

    return {
      topics,
    };
  }
}
