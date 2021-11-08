import { ICreateTopicRepository } from '@domain/repositories/topics/create-topic.repository';
import { ICreateTopicUseCase } from '@domain/use-cases/topics/create-topic.usecase';

import { IRequestCreateTopicUseCaseDTO } from '@dtos/topics/create-topic.dto';

import { TopicModel } from '@models/topic.model';

export class CreateTopicUseCase implements ICreateTopicUseCase {
  constructor(private readonly topicsRepository: ICreateTopicRepository) {}

  public async execute({
    name,
    subjectId,
  }: IRequestCreateTopicUseCaseDTO): Promise<TopicModel> {
    return await this.topicsRepository.create({
      name,
      subjectId,
    });
  }
}
