import { IArticleDataReplication } from '@domain/providers/data-replications/users/article-data-replication.provider';
import { ISoftDeleteArticleRepository } from '@domain/repositories/articles/soft-delete-article.repository';
import { IDisableArticleUseCase } from '@domain/use-cases/articles/disable-article.usecase';

import { DisableArticleUseCaseDTO } from '@dtos/articles/disable-article.dto';

export class DisableArticleUseCase implements IDisableArticleUseCase {
  constructor(
    private readonly articlesRepository: ISoftDeleteArticleRepository,
    private readonly dataReplications: IArticleDataReplication,
  ) {}

  public async execute({
    article,
  }: DisableArticleUseCaseDTO.Params): DisableArticleUseCaseDTO.Result {
    const articleDisabled = await this.articlesRepository.softDelete({
      article,
    });

    this.dataReplications.article({
      article: articleDisabled,
      type: 'update',
    });

    return {
      article: articleDisabled,
    };
  }
}
