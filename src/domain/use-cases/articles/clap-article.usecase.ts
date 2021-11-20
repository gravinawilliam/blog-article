import { ClapArticleUseCaseDTO } from '@dtos/articles/clap-article.dto';

export interface IClapArticleUseCase {
  execute(params: ClapArticleUseCaseDTO.Params): ClapArticleUseCaseDTO.Result;
}
