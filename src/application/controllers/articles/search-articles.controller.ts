import { ISearchArticlesUseCase } from '@domain/use-cases/articles/search-articles.usecase';
import { ISearchArticlesValidator } from '@domain/validators/articles/search-articles.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class SearchArticlesController implements IController {
  constructor(
    private readonly searchArticlesValidator: ISearchArticlesValidator,
    private readonly searchArticlesUseCase: ISearchArticlesUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { most_liked: mostLiked, searching } = httpRequest.headers;

    const validated = this.searchArticlesValidator.execute({
      mostLiked,
      searching,
    });
    if (validated.isLeft()) return validated.value;

    const { articles } = await this.searchArticlesUseCase.execute({
      mostLiked,
      searching,
    });
    return ok(articles);
  }
}
