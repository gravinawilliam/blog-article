import { UpdateStatusArticleRepositoryDTO } from '@dtos/articles/articles-repository.dto';

export interface IUpdateStatusArticleRepository {
  updateStatus(
    params: UpdateStatusArticleRepositoryDTO.Params,
  ): UpdateStatusArticleRepositoryDTO.Result;
}
