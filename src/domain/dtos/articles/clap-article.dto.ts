import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace ClapArticleValidatorDTO {
  export type Params = {
    articleId: string;
    clappedHands: boolean;
    authorization: string;
  };

  export type Result = Promise<
    Either<
      IHttpResponse,
      {
        userId: string;
      }
    >
  >;
}

export namespace ClapArticleUseCaseDTO {
  export type Params = {
    userId: string;
    articleId: string;
    clappedHands: boolean;
  };

  export type Result = Promise<void>;
}
