import { DisableArticleValidatorDTO } from '@dtos/articles/disable-article.dto';

export interface IDisableArticleValidator {
  execute(
    params: DisableArticleValidatorDTO.Params,
  ): DisableArticleValidatorDTO.Result;
}
