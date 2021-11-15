import { IFindAllArticlesRepository } from '@domain/repositories/articles/find-all-articles.repository';
import { IListAllArticlesUseCase } from '@domain/use-cases/articles/list-all-articles.usecase';

import { ListAllArticlesUseCaseDTO } from '@dtos/articles/list-all-articles.dto';

export class ListAllArticlesUseCase implements IListAllArticlesUseCase {
  constructor(
    private readonly articlesRepository: IFindAllArticlesRepository,
  ) {}

  public async execute(): Promise<ListAllArticlesUseCaseDTO.Result> {
    const articles = await this.articlesRepository.findAll();
    return {
      articles,
    };
  }
}
