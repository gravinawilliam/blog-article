import { getRepository, Repository } from 'typeorm';

import { IFindByDescriptionReviewerStatusRepository } from '@domain/repositories/reviewer-status/find-by-description-reviewer-status.repository';

import { ReviewerStatusModel } from '@models/reviewer-status.model';

import { Either, left, right } from '@shared/utils/either';

import { ReviewerStatusEntity } from '../entities/reviewer-status.entity';

export default class ReviewerStatusTypeormRepository
  implements IFindByDescriptionReviewerStatusRepository
{
  private ormRepository: Repository<ReviewerStatusEntity>;

  constructor() {
    this.ormRepository = getRepository(ReviewerStatusEntity);
  }

  public async findByDescription(
    description: string,
  ): Promise<Either<undefined, ReviewerStatusModel>> {
    const found = await this.ormRepository.findOne({
      where: {
        description,
      },
    });
    if (found === undefined) return left(undefined);
    return right(found);
  }
}
