import { UpdateAmountClapsArticlesRepositoryDTO } from '@dtos/articles/articles-repository.dto';

export interface IUpdateAmountClapsArticlesRepository {
  updateAmountClaps(
    params: UpdateAmountClapsArticlesRepositoryDTO.Params,
  ): UpdateAmountClapsArticlesRepositoryDTO.Result;
}
