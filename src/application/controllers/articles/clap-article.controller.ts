import { IClapArticleUseCase } from '@domain/use-cases/articles/clap-article.usecase';
import { IClapArticleValidator } from '@domain/validators/articles/clap-article.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response';

export class ClapArticleController implements IController {
  constructor(
    private readonly clapArticleValidator: IClapArticleValidator,
    private readonly clapArticleUseCase: IClapArticleUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;
    const { article_id: articleId, clapped_hands: clappedHands } =
      httpRequest.body;

    const validated = await this.clapArticleValidator.execute({
      articleId,
      clappedHands,
      authorization,
    });
    if (validated.isLeft()) return validated.value;

    const { userId } = validated.value;

    await this.clapArticleUseCase.execute({
      articleId,
      clappedHands,
      userId,
    });

    return created();
  }
}
