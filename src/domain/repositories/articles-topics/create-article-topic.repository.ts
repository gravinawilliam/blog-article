import { IParamsCreateArticleTopicRepositoryDTO } from '@dtos/articles/create-article.dto';

export interface ICreateArticleTopicRepository {
  create(params: IParamsCreateArticleTopicRepositoryDTO): Promise<void>;
}
