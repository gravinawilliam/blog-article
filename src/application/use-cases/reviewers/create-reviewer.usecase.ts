import { ICreateReviewerRepository } from '@domain/repositories/reviewers/create-reviewer.repository';
import { ICreateReviewerUseCase } from '@domain/use-cases/reviewers/create-reviewer.usecase';

import { IRequestCreateReviewerUseCaseDTO } from '@dtos/reviewers/create-reviewer.dto';

export class CreateReviewerUseCase implements ICreateReviewerUseCase {
  constructor(
    private readonly reviewersRepository: ICreateReviewerRepository,
  ) {}

  async execute(params: IRequestCreateReviewerUseCaseDTO): Promise<void> {
    await this.reviewersRepository.create(params);
  }
}
