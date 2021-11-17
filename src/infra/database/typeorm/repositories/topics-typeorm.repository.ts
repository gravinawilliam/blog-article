import { getRepository, Repository } from 'typeorm';

import { ICreateTopicRepository } from '@domain/repositories/topics/create-topic.repository';
import { IFindByIdsTopicsRepository } from '@domain/repositories/topics/find-by-ids-topics.repository';
import { IFindByNameTopicsRepository } from '@domain/repositories/topics/find-by-name-topics.repository';
import { IFindTopicsBySubjectIdRepository } from '@domain/repositories/topics/find-topics-by-subject-id.repository';

import { IRequestCreateTopicUseCaseDTO } from '@dtos/topics/create-topic.dto';
import { FindTopicsBySubjectIdRepositoryDTO } from '@dtos/topics/topics-repository.dto';

import { TopicModel } from '@models/topic.model';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { notFound } from '@shared/utils/http-response';

import { TopicEntity } from '../entities/topic.entity';

export default class TopicsTypeormRepository
  implements
    ICreateTopicRepository,
    IFindByNameTopicsRepository,
    IFindByIdsTopicsRepository,
    IFindTopicsBySubjectIdRepository
{
  private ormRepository: Repository<TopicEntity>;

  constructor() {
    this.ormRepository = getRepository(TopicEntity);
  }

  public async create(
    params: IRequestCreateTopicUseCaseDTO,
  ): Promise<TopicModel> {
    const created = this.ormRepository.create(params);
    await this.ormRepository.save(created);
    return created;
  }

  public async findByIds(
    topicIds: string[],
  ): Promise<Either<IHttpResponse, TopicModel[]>> {
    const found = await this.ormRepository.findByIds(topicIds);
    if (topicIds.length !== found.length) {
      return left(notFound(new NotFoundModelError('topic')));
    }
    return right(found);
  }

  public async findByName(
    name: string,
  ): Promise<Either<undefined, TopicModel>> {
    const found = await this.ormRepository.findOne({
      where: { name },
    });
    if (found === undefined) return left(found as undefined);
    return right(found);
  }

  public async findBySubjectId({
    subjectId,
  }: FindTopicsBySubjectIdRepositoryDTO.Params): FindTopicsBySubjectIdRepositoryDTO.Result {
    return await this.ormRepository.find({
      where: {
        subjectId,
      },
    });
  }
}
