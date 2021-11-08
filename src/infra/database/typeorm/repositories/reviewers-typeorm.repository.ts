import { getRepository, Repository } from 'typeorm';

import { ICreateReviewerRepository } from '@domain/repositories/reviewers/create-reviewer.repository';
import { IFindByReviewingArticlesReviewersRepository } from '@domain/repositories/reviewers/find-by-reviewing-articles.repository';
import { IFindByUserIdReviewersRepository } from '@domain/repositories/reviewers/find-by-user-id-reviewers.repository';

import { CreateReviewerRepositoryDTO } from '@dtos/reviewers/create-reviewer.dto';

import { ReviewerModel } from '@models/reviewer.model';

import { ReviewerEntity } from '../entities/reviewer.entity';

export default class ReviewersTypeormRepository
  implements
    ICreateReviewerRepository,
    IFindByUserIdReviewersRepository,
    IFindByReviewingArticlesReviewersRepository
{
  private ormRepository: Repository<ReviewerEntity>;

  constructor() {
    this.ormRepository = getRepository(ReviewerEntity);
  }

  public async create(
    params: CreateReviewerRepositoryDTO.Params,
  ): Promise<CreateReviewerRepositoryDTO.Result> {
    const reviewerCreated = this.ormRepository.create(params);
    return await this.ormRepository.save(reviewerCreated);
  }

  public async findByUserId(userId: string): Promise<ReviewerModel> {
    return await this.ormRepository.findOne({
      where: {
        userId,
      },
    });
  }

  public async findBySmaller(): Promise<ReviewerModel> {
    return await this.ormRepository.findOne({
      order: {
        reviewingArticles: 'ASC',
      },
    });
  }
}
