import { IListAllArticlesUseCase } from '@domain/use-cases/articles/list-all-articles.usecase';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ListAllArticlesController implements IController {
  constructor(
    private readonly listAllArticlesUseCase: IListAllArticlesUseCase,
  ) {}

  async handle(): Promise<IHttpResponse> {
    const { articles } = await this.listAllArticlesUseCase.execute();
    return ok(articles);
  }
}
