import { ICreateArticleDataReplication } from '@domain/providers/data-replications/users/create-article-data-replication.provider';
import { IPostHttp } from '@domain/providers/http/post-http.provider';

import { ArticleModel } from '@models/article.model';

import envConfig from '@main/config/env.config';

export class ArticlesDataReplication implements ICreateArticleDataReplication {
  constructor(private readonly httpRequest: IPostHttp) {}

  public async createArticle(article: ArticleModel): Promise<void> {
    await this.httpRequest.post({
      data: article,
      url: `${envConfig.url.internalMicroServices.dataReplication}/articles/replication/create`,
    });
  }
}
