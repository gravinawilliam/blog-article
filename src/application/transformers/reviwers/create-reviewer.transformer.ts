import { IFindByDescriptionReviewerStatusRepository } from '@domain/repositories/reviewer-status/find-by-description-reviewer-status.repository';
import { ICreateReviewerTransformer } from '@domain/transformers/reviewers/create-reviewer.transformer';

import { IResponseCreateReviewerTransformerDTO } from '@dtos/reviewers/create-reviewer.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest } from '@shared/utils/http-response';

export class CreateReviewerTransformer implements ICreateReviewerTransformer {
  constructor(
    private readonly reviewerStatusRepository: IFindByDescriptionReviewerStatusRepository,
  ) {}

  public async execute(): Promise<
    Either<IHttpResponse, IResponseCreateReviewerTransformerDTO>
  > {
    const reviewerStatus =
      await this.reviewerStatusRepository.findByDescription('pending');

    if (reviewerStatus.isLeft()) {
      return left(badRequest(new NotFoundModelError('reviewer status')));
    }

    const { id: reviewerStatusId, description: reviewerStatusDescription } =
      reviewerStatus.value;

    return right({
      reviewerStatusId,
      reviewerStatusDescription,
    });
  }
}
