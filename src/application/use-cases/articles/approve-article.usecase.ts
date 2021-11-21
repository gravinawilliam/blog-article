import { statusConfig } from '@application/configs/status.config';

import { IUpdateStatusArticleRepository } from '@domain/repositories/articles/update-status-article.repository';
import { IApproveArticleUseCase } from '@domain/use-cases/articles/approve-article.usecase';

import { ApproveArticleUseCaseDTO } from '@dtos/articles/approve-article.dto';

export class ApproveArticleUseCase implements IApproveArticleUseCase {
  constructor(
    private readonly articlesRepository: IUpdateStatusArticleRepository,
  ) {}

  public async execute({
    approved,
    articleId,
  }: ApproveArticleUseCaseDTO.Params): ApproveArticleUseCaseDTO.Result {
    const statusArticle = approved
      ? statusConfig.article.approved
      : statusConfig.article.disapproved;

    await this.articlesRepository.updateStatus({
      articleId,
      status: statusArticle,
    });
    return {
      statusArticle,
    };
  }
}
