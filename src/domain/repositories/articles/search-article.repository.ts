import { SearchArticleRepositoryDTO } from '@dtos/articles/articles-repository.dto';

export interface ISearchArticleRepository {
  search(
    params: SearchArticleRepositoryDTO.Params,
  ): SearchArticleRepositoryDTO.Result;
}
