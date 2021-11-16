import { FindAllArticlesByStatusRepositoryDTO } from '@dtos/articles/articles-repository.dto';

export interface IFindAllArticlesByStatusRepository {
  findAllByStatus(
    params: FindAllArticlesByStatusRepositoryDTO.Params,
  ): FindAllArticlesByStatusRepositoryDTO.Result;
}
