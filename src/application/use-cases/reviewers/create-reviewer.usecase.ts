import { statusConfig } from '@application/configs/status.config';

import { ICreateReviewerRepository } from '@domain/repositories/reviewers/create-reviewer.repository';
import { ICreateReviewerUseCase } from '@domain/use-cases/reviewers/create-reviewer.usecase';

import { CreateReviewerUseCaseDTO } from '@dtos/reviewers/create-reviewer.dto';

export class CreateReviewerUseCase implements ICreateReviewerUseCase {
  constructor(
    private readonly reviewersRepository: ICreateReviewerRepository,
  ) {}

  async execute({
    userId,
  }: CreateReviewerUseCaseDTO.Params): Promise<CreateReviewerUseCaseDTO.Result> {
    return await this.reviewersRepository.create({
      reviewerStatus: statusConfig.article.pending,
      userId,
    });
  }
}
