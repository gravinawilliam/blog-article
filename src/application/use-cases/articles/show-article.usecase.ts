import { IFindByIdArticleRepository } from '@domain/repositories/articles/find-by-id-article.repository';
import { IShowArticleUseCase } from '@domain/use-cases/articles/show-article.usecase';

import { ShowArticleUseCaseDTO } from '@dtos/articles/show-article.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { notFound } from '@shared/utils/http-response';

export class ShowArticleUseCase implements IShowArticleUseCase {
  constructor(
    private readonly articlesRepository: IFindByIdArticleRepository,
  ) {}

  public async execute({
    articleId,
  }: ShowArticleUseCaseDTO.Params): ShowArticleUseCaseDTO.Result {
    const articleExists = await this.articlesRepository.findById({ articleId });

    if (articleExists.isLeft()) {
      return left(notFound(new NotFoundModelError('article')));
    }

    const { article } = articleExists.value;

    return right({
      article,
    });
  }
}
