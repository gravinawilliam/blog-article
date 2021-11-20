import { ArticleModel } from '@models/article.model';

import { Either } from '@shared/utils/either';

export namespace FindByIdArticleRepositoryDTO {
  export type Params = {
    articleId: string;
  };

  export type Result = Promise<
    Either<
      undefined,
      {
        article: ArticleModel;
      }
    >
  >;
}

export namespace FindAllArticlesByStatusRepositoryDTO {
  export type Params = {
    status: string;
  };

  export type Result = Promise<ArticleModel[]>;
}

export namespace SoftDeleteArticleRepositoryDTO {
  export type Params = {
    article: ArticleModel;
  };

  export type Result = Promise<ArticleModel>;
}

export namespace SearchArticleRepositoryDTO {
  export type Params = {
    mostClap: boolean;
    searching: string;
  };

  export type Result = Promise<ArticleModel[]>;
}

export namespace UpdateAmountClapsArticlesRepositoryDTO {
  export type Params = {
    articleId: string;
    clappedHands: boolean;
  };

  export type Result = Promise<void>;
}
