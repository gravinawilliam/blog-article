import { IArticleDataReplication } from '@domain/providers/data-replications/users/article-data-replication.provider';
import { IPostHttp } from '@domain/providers/http/post-http.provider';

import { ArticleDataReplicationDTO } from '@dtos/_providers/data-replications/article-data-replication.dto';

import envConfig from '@main/config/env.config';

export class ArticleDataReplication implements IArticleDataReplication {
  constructor(private readonly httpRequest: IPostHttp) {}

  public async article({
    article,
    type,
  }: ArticleDataReplicationDTO.Params): ArticleDataReplicationDTO.Result {
    try {
      await this.httpRequest.post({
        data: {
          article,
          type,
          producer: 'blog-article',
          key: envConfig.dataReplication.key,
        },
        url: `${envConfig.url.internalMicroServices.dataReplication}/article`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
