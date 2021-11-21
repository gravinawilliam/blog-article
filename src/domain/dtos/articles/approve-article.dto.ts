import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace ApproveArticleValidatorDTO {
  export type Params = {
    articleId: string;
    approved: boolean;
    authorization: string;
  };

  export type Result = Promise<
    Either<
      IHttpResponse,
      {
        reviewerId: string;
      }
    >
  >;
}

export namespace ApproveArticleUseCaseDTO {
  export type Params = {
    approved: boolean;
    articleId: string;
  };

  export type Result = Promise<{
    statusArticle: string;
  }>;
}
