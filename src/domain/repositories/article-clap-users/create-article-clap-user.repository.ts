import { CreateArticleClapUserRepositoryDTO } from '@dtos/article-clap-users/article-clap-users-repository.dto';

export interface ICreateArticleClapUserRepository {
  create(
    params: CreateArticleClapUserRepositoryDTO.Params,
  ): CreateArticleClapUserRepositoryDTO.Result;
}
