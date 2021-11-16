import { ListAllArticlesByStatusUseCaseDTO } from '@dtos/articles/list-all-articles-by-status.dto';

export interface IListAllArticlesByStatusUseCase {
  execute(
    params: ListAllArticlesByStatusUseCaseDTO.Params,
  ): Promise<ListAllArticlesByStatusUseCaseDTO.Result>;
}
