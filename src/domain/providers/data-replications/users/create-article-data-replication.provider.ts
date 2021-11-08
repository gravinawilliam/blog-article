import { ArticleModel } from '@models/article.model';

export interface ICreateArticleDataReplication {
  createArticle(article: ArticleModel): Promise<void>;
}
