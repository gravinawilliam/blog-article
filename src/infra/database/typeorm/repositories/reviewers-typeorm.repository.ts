import { getRepository, Repository } from 'typeorm';

import { ICreateReviewerRepository } from '@domain/repositories/reviewers/create-reviewer.repository';
import { IFindByReviewingArticlesReviewersRepository } from '@domain/repositories/reviewers/find-by-reviewing-articles.repository';
import { IFindByUserIdReviewersRepository } from '@domain/repositories/reviewers/find-by-user-id-reviewers.repository';

import { ICreateReviewerDTO } from '@dtos/reviewers/create-reviewer.dto';

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

  public async create(params: ICreateReviewerDTO): Promise<ReviewerModel> {
    const reviewerCreated = this.ormRepository.create(params);
    await this.ormRepository.save(reviewerCreated);
    return reviewerCreated;
  }

  public async findByUserId(userId: string): Promise<ReviewerModel> {
    const reviewerFound = await this.ormRepository.findOne({
      where: {
        userId,
      },
    });
    return reviewerFound;
  }

  public async findBySmaller(): Promise<ReviewerModel> {
    const reviewerFound = await this.ormRepository.findOne({
      order: {
        reviewingArticles: 'ASC',
      },
    });
    return reviewerFound;
  }
}
