import { ArticleModel } from '@models/article.model';

export namespace ListAllArticlesByStatusUseCaseDTO {
  export type Params = {
    status: string;
  };
  export type Result = {
    articles: ArticleModel[];
  };
}
