import { ArticleModel } from '@models/article.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace DisableArticleValidatorDTO {
  export type Params = {
    authorization: string;
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

export namespace DisableArticleUseCaseDTO {
  export type Params = {
    article: ArticleModel;
  };

  export type Result = Promise<{
    article: ArticleModel;
  }>;
}
