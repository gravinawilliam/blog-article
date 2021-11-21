import { ArticleModel } from '@models/article.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace SearchArticlesUseCaseDTO {
  export type Params = { mostClap: boolean; searching: string };
  export type Result = Promise<{
    articles: ArticleModel[];
  }>;
}

export namespace SearchArticlesValidatorDTO {
  export type Params = {
    mostClap: boolean;
    searching: string;
  };
  export type Result = Either<IHttpResponse, void>;
}
