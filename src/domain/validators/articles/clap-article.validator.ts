import { ClapArticleValidatorDTO } from '@dtos/articles/clap-article.dto';

export interface IClapArticleValidator {
  execute(
    params: ClapArticleValidatorDTO.Params,
  ): ClapArticleValidatorDTO.Result;
}
