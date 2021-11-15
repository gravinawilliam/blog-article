import { ArticleModel } from '@models/article.model';

export namespace ArticleDataReplicationDTO {
  export type Params = {
    article: ArticleModel;
    type: string;
  };

  export type Result = Promise<void>;
}
