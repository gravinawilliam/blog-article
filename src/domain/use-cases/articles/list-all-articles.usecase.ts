import { ListAllArticlesUseCaseDTO } from '@dtos/articles/list-all-articles.dto';

export interface IListAllArticlesUseCase {
  execute(): Promise<ListAllArticlesUseCaseDTO.Result>;
}
