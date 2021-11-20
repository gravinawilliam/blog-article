import { getRepository, Repository } from 'typeorm';

import { ICreateArticleClapUserRepository } from '@domain/repositories/article-clap-users/create-article-clap-user.repository';
import { IRemoveArticleClapUserRepository } from '@domain/repositories/article-clap-users/remove-article-clap-user.repository';

import { CreateArticleClapUserRepositoryDTO } from '@dtos/article-clap-users/article-clap-users-repository.dto';

import { ArticleClapUserEntity } from '../entities/article-clap-user.entity';

export default class ArticleClapUsersTypeormRepository
  implements ICreateArticleClapUserRepository, IRemoveArticleClapUserRepository
{
  private ormRepository: Repository<ArticleClapUserEntity>;

  constructor() {
    this.ormRepository = getRepository(ArticleClapUserEntity);
  }

  public async create({
    articleId,
    userId,
  }: CreateArticleClapUserRepositoryDTO.Params): CreateArticleClapUserRepositoryDTO.Result {
    const found = await this.ormRepository.findOne({
      where: {
        articleId,
        userId,
      },
    });

    if (found === undefined) {
      const created = this.ormRepository.create({
        userId,
        articleId,
      });
      await this.ormRepository.save(created);
    }
  }

  public async remove({
    articleId,
    userId,
  }: CreateArticleClapUserRepositoryDTO.Params): CreateArticleClapUserRepositoryDTO.Result {
    const found = await this.ormRepository.findOne({
      where: {
        articleId,
        userId,
      },
    });

    if (found !== undefined) {
      await this.ormRepository.save({
        ...found,
        deletedAt: new Date(),
      });
    }
  }
}
