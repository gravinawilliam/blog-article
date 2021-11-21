import { CreateArticleClapUserRepositoryDTO } from '@dtos/article-clap-users/article-clap-users-repository.dto';

export interface IRemoveArticleClapUserRepository {
  remove(
    params: CreateArticleClapUserRepositoryDTO.Params,
  ): CreateArticleClapUserRepositoryDTO.Result;
}
