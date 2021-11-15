import { statusConfig } from '@application/configs/status.config';

import { IArticleDataReplication } from '@domain/providers/data-replications/users/create-article-data-replication.provider';
import { ICreateArticleRepository } from '@domain/repositories/articles/create-article.repository';
import { ICreateArticleUseCase } from '@domain/use-cases/articles/create-article.usecase';

import {
  IParamsCreateArticleUseCaseDTO,
  IResponseCreateArticleUseCaseDTO,
} from '@dtos/articles/create-article.dto';

export class CreateArticleUseCase implements ICreateArticleUseCase {
  constructor(
    private readonly articlesRepository: ICreateArticleRepository,
    private readonly dataReplications: IArticleDataReplication,
  ) {}

  public async execute({
    authorId,
    reviewerId,
    title,
    topics,
    description,
  }: IParamsCreateArticleUseCaseDTO): Promise<IResponseCreateArticleUseCaseDTO> {
    const createdArticle = await this.articlesRepository.create({
      authorId,
      reviewerId,
      title,
      status: statusConfig.article.pending,
      topics,
      description,
    });

    this.dataReplications.article({
      article: createdArticle,
      type: 'create',
    });

    return {
      id: createdArticle.id,
      status: createdArticle.status,
    };
  }
}
