import { IParamsCreateArticleAfterUseCaseTransformerDTO } from '@dtos/articles/create-article.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

//* joins the article with the topics
export interface ICreateArticleAfterUseCaseTransformer {
  execute(
    params: IParamsCreateArticleAfterUseCaseTransformerDTO,
  ): Promise<Either<IHttpResponse, null>>;
}
