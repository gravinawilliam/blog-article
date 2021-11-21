import { getRepository, Like, Repository } from 'typeorm';

import { statusConfig } from '@application/configs/status.config';

import { ICreateArticleRepository } from '@domain/repositories/articles/create-article.repository';
import { IFindAllArticlesByStatusRepository } from '@domain/repositories/articles/find-all-articles-by-status.repository';
import { IFindByIdArticleRepository } from '@domain/repositories/articles/find-by-id-article.repository';
import { ISearchArticleRepository } from '@domain/repositories/articles/search-article.repository';
import { ISoftDeleteArticleRepository } from '@domain/repositories/articles/soft-delete-article.repository';
import { IUpdateAmountClapsArticlesRepository } from '@domain/repositories/articles/update-amount-claps-articles.repository';
import { IUpdateStatusArticleRepository } from '@domain/repositories/articles/update-status-article.repository';

import {
  FindAllArticlesByStatusRepositoryDTO,
  FindByIdArticleRepositoryDTO,
  SearchArticleRepositoryDTO,
  SoftDeleteArticleRepositoryDTO,
  UpdateAmountClapsArticlesRepositoryDTO,
  UpdateStatusArticleRepositoryDTO,
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
    IFindByIdArticleRepository,
    ISearchArticleRepository,
    IUpdateAmountClapsArticlesRepository,
    IUpdateStatusArticleRepository
{
  private ormRepository: Repository<ArticleEntity>;

  constructor() {
    this.ormRepository = getRepository(ArticleEntity);
  }

  public async updateStatus({
    articleId,
    status,
  }: UpdateStatusArticleRepositoryDTO.Params): UpdateStatusArticleRepositoryDTO.Result {
    await this.ormRepository.update(articleId, {
      status,
    });
  }

  public async updateAmountClaps({
    articleId,
    clappedHands,
  }: UpdateAmountClapsArticlesRepositoryDTO.Params): UpdateAmountClapsArticlesRepositoryDTO.Result {
    const found = await this.ormRepository.findOne({
      where: {
        id: articleId,
        status: statusConfig.article.approved,
      },
    });
    if (found !== undefined) {
      await this.ormRepository.save({
        ...found,
        amountClaps: clappedHands
          ? (found.amountClaps += 1)
          : (found.amountClaps -= 1),
      });
    }
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

  public async search({
    searching,
    mostClap,
  }: SearchArticleRepositoryDTO.Params): SearchArticleRepositoryDTO.Result {
    return await this.ormRepository.find({
      where: [
        {
          title: Like(`%${searching}%`),
          status: statusConfig.article.approved,
        },
      ],
      take: 10,
      order: mostClap
        ? {
            amountClaps: 'DESC',
          }
        : {},
    });
  }
}
