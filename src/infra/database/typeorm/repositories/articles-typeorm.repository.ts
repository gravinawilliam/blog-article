import { getRepository, Repository } from 'typeorm';

import { ICreateArticleRepository } from '@domain/repositories/articles/create-article.repository';

import { IParamsCreateArticleRepositoryDTO } from '@dtos/articles/create-article.dto';

import { ArticleModel } from '@models/article.model';

import { ArticleEntity } from '../entities/article.entity';

export default class ArticlesTypeormRepository
  implements ICreateArticleRepository
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
}
