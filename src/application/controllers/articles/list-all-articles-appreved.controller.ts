import { statusConfig } from '@application/configs/status.config';

import { IListAllArticlesByStatusUseCase } from '@domain/use-cases/articles/list-all-articles-by-status.usecase';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ListAllArticlesApprovedController implements IController {
  constructor(
    private readonly listAllArticlesByStatusUseCase: IListAllArticlesByStatusUseCase,
  ) {}

  async handle(): Promise<IHttpResponse> {
    const { articles } = await this.listAllArticlesByStatusUseCase.execute({
      status: statusConfig.article.approved,
    });
    return ok(articles);
  }
}
