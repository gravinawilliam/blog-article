import { ICreateArticleBeforeUseCaseTransformer } from '@domain/transformers/articles/create-article-before-usecase.transformer';
import { ICreateArticleUseCase } from '@domain/use-cases/articles/create-article.usecase';
import { ICreateArticleValidator } from '@domain/validators/articles/create-article.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response';

export class CreateArticleController implements IController {
  constructor(
    private readonly createArticleValidator: ICreateArticleValidator,
    private readonly createArticleUseCase: ICreateArticleUseCase,
    private readonly createArticleBeforeUseCaseTransformer: ICreateArticleBeforeUseCaseTransformer,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;
    // ? topic_ids = array ids topics
    const { title, topic_ids: topicIds } = httpRequest.body;

    const validatedArticle = await this.createArticleValidator.execute({
      title,
      topicIds,
      authorization,
    });
    if (validatedArticle.isLeft()) return validatedArticle.value;

    const { userId, topics } = validatedArticle.value;

    const beforeUseCaseTransformer =
      await this.createArticleBeforeUseCaseTransformer.execute();
    if (beforeUseCaseTransformer.isLeft()) {
      return beforeUseCaseTransformer.value;
    }

    const { reviewerId } = beforeUseCaseTransformer.value;

    const createdArticle = await this.createArticleUseCase.execute({
      title,
      authorId: userId,
      reviewerId,
      topics,
    });

    return created(createdArticle);
  }
}
