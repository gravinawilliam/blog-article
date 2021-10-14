import { IParamsCreateArticleRepositoryDTO } from '@dtos/articles/create-article.dto';

import { ArticleModel } from '../../models/article.model';

export interface ICreateArticleRepository {
  create(params: IParamsCreateArticleRepositoryDTO): Promise<ArticleModel>;
}
