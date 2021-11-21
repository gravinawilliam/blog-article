import { IApproveArticleUseCase } from '@domain/use-cases/articles/approve-article.usecase';
import { IApproveArticleValidator } from '@domain/validators/articles/approve-article.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ApproveArticleController implements IController {
  constructor(
    private readonly approveArticleValidator: IApproveArticleValidator,
    private readonly approveArticleUseCase: IApproveArticleUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;
    const { approved, article_id: articleId } = httpRequest.body;

    const validated = await this.approveArticleValidator.execute({
      approved,
      articleId,
      authorization,
    });
    if (validated.isLeft()) return validated.value;

    const result = await this.approveArticleUseCase.execute({
      approved,
      articleId,
    });

    return ok(result);
  }
}
