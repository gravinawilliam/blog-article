import { ISearchArticlesUseCase } from '@domain/use-cases/articles/search-articles.usecase';
import { ISearchArticlesValidator } from '@domain/validators/articles/search-articles.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { converterStringInBoolean } from '@shared/utils/converters';
import { ok } from '@shared/utils/http-response';

export class SearchArticlesController implements IController {
  constructor(
    private readonly searchArticlesValidator: ISearchArticlesValidator,
    private readonly searchArticlesUseCase: ISearchArticlesUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { most_clap, searching } = httpRequest.query;

    const mostClap = converterStringInBoolean(most_clap);

    const validated = this.searchArticlesValidator.execute({
      mostClap,
      searching,
    });
    if (validated.isLeft()) return validated.value;

    const { articles } = await this.searchArticlesUseCase.execute({
      mostClap,
      searching,
    });
    return ok(articles);
  }
}
