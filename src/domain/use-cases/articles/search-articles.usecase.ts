import { SearchArticlesUseCaseDTO } from '@dtos/articles/search-articles.dto';

export interface ISearchArticlesUseCase {
  execute(
    params: SearchArticlesUseCaseDTO.Params,
  ): Promise<SearchArticlesUseCaseDTO.Result>;
}
