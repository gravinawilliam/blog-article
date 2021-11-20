import { ICreateArticleClapUserRepository } from '@domain/repositories/article-clap-users/create-article-clap-user.repository';
import { IRemoveArticleClapUserRepository } from '@domain/repositories/article-clap-users/remove-article-clap-user.repository';
import { IUpdateAmountClapsArticlesRepository } from '@domain/repositories/articles/update-amount-claps-articles.repository';
import { IClapArticleUseCase } from '@domain/use-cases/articles/clap-article.usecase';

import { ClapArticleUseCaseDTO } from '@dtos/articles/clap-article.dto';

export class ClapArticleUseCase implements IClapArticleUseCase {
  constructor(
    private readonly articleClapUserRepository: ICreateArticleClapUserRepository &
      IRemoveArticleClapUserRepository,
    private readonly articlesRepository: IUpdateAmountClapsArticlesRepository,
  ) {}

  public async execute({
    articleId,
    clappedHands,
    userId,
  }: ClapArticleUseCaseDTO.Params): ClapArticleUseCaseDTO.Result {
    if (clappedHands) {
      await this.articleClapUserRepository.create({
        articleId,
        userId,
      });
    } else {
      await this.articleClapUserRepository.remove({
        articleId,
        userId,
      });
    }
    await this.articlesRepository.updateAmountClaps({
      articleId,
      clappedHands,
    });
  }
}
