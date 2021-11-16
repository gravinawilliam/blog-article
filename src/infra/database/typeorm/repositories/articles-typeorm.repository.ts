import { getRepository, Repository } from 'typeorm';

import { ICreateArticleRepository } from '@domain/repositories/articles/create-article.repository';
import { IFindAllArticlesByStatusRepository } from '@domain/repositories/articles/find-all-articles-by-status.repository';
import { IFindByIdArticleRepository } from '@domain/repositories/articles/find-by-id-article.repository';
import { ISoftDeleteArticleRepository } from '@domain/repositories/articles/soft-delete-article.repository';

import {
  FindAllArticlesByStatusRepositoryDTO,
  FindByIdArticleRepositoryDTO,
  SoftDeleteArticleRepositoryDTO,
} from '@dtos/articles/articles-repository.dto';
import { IParamsCreateArticleRepositoryDTO } from '@dtos/articles/create-article.dto';

import { ArticleModel } from '@models/article.model';

import { left, right } from '@shared/utils/either';

import { ArticleEntity } from '../entities/article.entity';

export default class ArticlesTypeormRepository
  implements
    ICreateArticleRepository,
    IFindAllArticlesByStatusRepository,
    ISoftDeleteArticleRepository,
    IFindByIdArticleRepository
{
  private ormRepository: Repository<ArticleEntity>;

  constructor() {
    this.ormRepository = getRepository(ArticleEntity);
  }

  public async create(
    params: IParamsCreateArticleRepositoryDTO,
  ): Promise<ArticleModel> {
    const created = this.ormRepository.create(params);
    return await this.ormRepository.save(created);
  }

  public async findAllByStatus({
    status,
  }: FindAllArticlesByStatusRepositoryDTO.Params): FindAllArticlesByStatusRepositoryDTO.Result {
    return await this.ormRepository.find({
      where: {
        status,
      },
    });
  }

  public async findById({
    articleId,
  }: FindByIdArticleRepositoryDTO.Params): FindByIdArticleRepositoryDTO.Result {
    const found = await this.ormRepository.findOne({
      where: {
        id: articleId,
      },
    });
    if (found === undefined) return left(found as undefined);
    return right({ article: found });
  }

  public async softDelete(
    params: SoftDeleteArticleRepositoryDTO.Params,
  ): SoftDeleteArticleRepositoryDTO.Result {
    const { article } = params;
    article.deletedAt = new Date();
    return await this.ormRepository.save(article);
  }
}
