import { FindByIdArticleRepositoryDTO } from '@dtos/articles/articles-repository.dto';

export interface IFindByIdArticleRepository {
  findById(
    params: FindByIdArticleRepositoryDTO.Params,
  ): FindByIdArticleRepositoryDTO.Result;
}
