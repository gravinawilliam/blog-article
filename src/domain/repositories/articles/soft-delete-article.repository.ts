import { SoftDeleteArticleRepositoryDTO } from '@dtos/articles/articles-repository.dto';

export interface ISoftDeleteArticleRepository {
  softDelete(
    params: SoftDeleteArticleRepositoryDTO.Params,
  ): SoftDeleteArticleRepositoryDTO.Result;
}
