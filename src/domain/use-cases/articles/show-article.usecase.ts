import { ShowArticleUseCaseDTO } from '@dtos/articles/show-article.dto';

export interface IShowArticleUseCase {
  execute(params: ShowArticleUseCaseDTO.Params): ShowArticleUseCaseDTO.Result;
}
