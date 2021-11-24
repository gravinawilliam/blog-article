import { statusConfig } from '@application/configs/status.config';

import { IUserDataReplication } from '@domain/providers/data-replications/users/user-data-replication.provider';
import { ICreateReviewerRepository } from '@domain/repositories/reviewers/create-reviewer.repository';
import { ICreateReviewerUseCase } from '@domain/use-cases/reviewers/create-reviewer.usecase';

import { CreateReviewerUseCaseDTO } from '@dtos/reviewers/create-reviewer.dto';

export class CreateReviewerUseCase implements ICreateReviewerUseCase {
  constructor(
    private readonly reviewersRepository: ICreateReviewerRepository,
    private readonly dataReplications: IUserDataReplication,
  ) {}

  async execute({ userId }: CreateReviewerUseCaseDTO.Params): Promise<CreateReviewerUseCaseDTO.Result> {
    this.dataReplications.user({
      type: 'update',
      user: {
        id: userId,
        isReviewer: true,
      },
    });
    return await this.reviewersRepository.create({
      reviewerStatus: statusConfig.article.pending,
      userId,
    });
  }
}
