import { DisableArticleUseCaseDTO } from '@dtos/articles/disable-article.dto';

export interface IDisableArticleUseCase {
  execute(
    params: DisableArticleUseCaseDTO.Params,
  ): DisableArticleUseCaseDTO.Result;
}
