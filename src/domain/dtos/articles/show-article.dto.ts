import { ArticleModel } from '@models/article.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace ShowArticleUseCaseDTO {
  export type Params = {
    articleId: string;
  };
  export type Result = Promise<
    Either<
      IHttpResponse,
      {
        article: ArticleModel;
      }
    >
  >;
}
