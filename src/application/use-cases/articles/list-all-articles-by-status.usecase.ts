import { IFindAllArticlesByStatusRepository } from '@domain/repositories/articles/find-all-articles-by-status.repository';
import { IListAllArticlesByStatusUseCase } from '@domain/use-cases/articles/list-all-articles-by-status.usecase';

import { ListAllArticlesByStatusUseCaseDTO } from '@dtos/articles/list-all-articles-by-status.dto';

export class ListAllArticlesByStatusUseCase
  implements IListAllArticlesByStatusUseCase
{
  constructor(
    private readonly articlesRepository: IFindAllArticlesByStatusRepository,
  ) {}

  async execute({
    status,
  }: ListAllArticlesByStatusUseCaseDTO.Params): Promise<ListAllArticlesByStatusUseCaseDTO.Result> {
    const articles = await this.articlesRepository.findAllByStatus({
      status,
    });
    return {
      articles,
    };
  }
}
