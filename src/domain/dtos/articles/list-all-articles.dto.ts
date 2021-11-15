import { ArticleModel } from '@models/article.model';

export namespace ListAllArticlesUseCaseDTO {
  export type Result = {
    articles: ArticleModel[];
  };
}
