import { ArticleModel } from '@models/article.model';

export interface IFindAllArticlesRepository {
  findAll(): Promise<ArticleModel[]>;
}
