import { SearchArticlesValidatorDTO } from '@dtos/articles/search-articles.dto';

export interface ISearchArticlesValidator {
  execute(
    params: SearchArticlesValidatorDTO.Params,
  ): SearchArticlesValidatorDTO.Result;
}
