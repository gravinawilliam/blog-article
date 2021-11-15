import { IDisableArticleUseCase } from '@domain/use-cases/articles/disable-article.usecase';
import { IDisableArticleValidator } from '@domain/validators/articles/disable-article.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class DisableArticleController implements IController {
  constructor(
    private readonly disableArticleValidator: IDisableArticleValidator,
    private readonly disableArticleUseCase: IDisableArticleUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;
    const { article_id: articleId } = httpRequest.params;

    const validated = await this.disableArticleValidator.execute({
      authorization,
      articleId,
    });
    if (validated.isLeft()) return validated.value;

    const { article } = validated.value;

    const disabled = await this.disableArticleUseCase.execute({
      article,
    });

    return ok(disabled);
  }
}
