import { statusConfig } from '@application/configs/status.config';

import { ICreateArticleRepository } from '@domain/repositories/articles/create-article.repository';
import { ICreateArticleUseCase } from '@domain/use-cases/articles/create-article.usecase';

import {
  IParamsCreateArticleUseCaseDTO,
  IResponseCreateArticleUseCaseDTO,
} from '@dtos/articles/create-article.dto';

export class CreateArticleUseCase implements ICreateArticleUseCase {
  constructor(private readonly articlesRepository: ICreateArticleRepository) {}

  public async execute({
    authorId,
    reviewerId,
    title,
    topics,
  }: IParamsCreateArticleUseCaseDTO): Promise<IResponseCreateArticleUseCaseDTO> {
    const { id, status } = await this.articlesRepository.create({
      authorId,
      reviewerId,
      title,
      status: statusConfig.article.pending,
      topics,
    });

    return {
      id,
      status,
    };
  }
}
