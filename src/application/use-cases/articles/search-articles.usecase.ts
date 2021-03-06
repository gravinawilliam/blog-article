import { ISearchArticleRepository } from '@domain/repositories/articles/search-article.repository';
import { ISearchArticlesUseCase } from '@domain/use-cases/articles/search-articles.usecase';

import { SearchArticlesUseCaseDTO } from '@dtos/articles/search-articles.dto';

export class SearchArticlesUseCase implements ISearchArticlesUseCase {
  constructor(private readonly articlesRepository: ISearchArticleRepository) {}

  public async execute({
    searching,
    mostClap,
  }: SearchArticlesUseCaseDTO.Params): Promise<SearchArticlesUseCaseDTO.Result> {
    const articles = await this.articlesRepository.search({
      mostClap,
      searching,
    });

    return {
      articles,
    };
  }
}
