import { statusConfig } from '@application/configs/status.config';

import { IShowArticleUseCase } from '@domain/use-cases/articles/show-article.usecase';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { notFound, ok } from '@shared/utils/http-response';

export class ShowArticleController implements IController {
  constructor(private readonly showArticleUseCase: IShowArticleUseCase) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { article_id: articleId } = httpRequest.params;

    const result = await this.showArticleUseCase.execute({
      articleId,
    });

    if (result.isLeft()) return result.value;

    const { article } = result.value;

    if (article.status !== statusConfig.article.approved) {
      return notFound(new NotFoundModelError('article'));
    }

    return ok(article);
  }
}
