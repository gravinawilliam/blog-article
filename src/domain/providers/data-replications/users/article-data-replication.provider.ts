import { ArticleDataReplicationDTO } from '@dtos/_providers/data-replications/article-data-replication.dto';

export interface IArticleDataReplication {
  article(
    params: ArticleDataReplicationDTO.Params,
  ): ArticleDataReplicationDTO.Result;
}
