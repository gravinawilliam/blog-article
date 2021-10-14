import { ICreateReviewerTransformer } from '@domain/transformers/reviewers/create-reviewer.transformer';
import { ICreateReviewerUseCase } from '@domain/use-cases/reviewers/create-reviewer.usecase';
import { ICreateReviewerValidator } from '@domain/validators/reviewers/create-reviewer.validator';

import { IResponseCreateReviewerDTO } from '@dtos/reviewers/create-reviewer.dto';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class CreateReviewerController implements IController {
  constructor(
    private readonly createReviewerUseCase: ICreateReviewerUseCase,
    private readonly createReviewerValidator: ICreateReviewerValidator,
    private readonly createReviewerTransformer: ICreateReviewerTransformer,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;

    const reviewerValidated = await this.createReviewerValidator.execute({
      authorization,
    });
    if (reviewerValidated.isLeft()) return reviewerValidated.value;

    const { userId } = reviewerValidated.value;

    const reviewerTransformed = await this.createReviewerTransformer.execute();
    if (reviewerTransformed.isLeft()) return reviewerTransformed.value;

    const { reviewerStatusId, reviewerStatusDescription } =
      reviewerTransformed.value;

    await this.createReviewerUseCase.execute({
      userId,
      reviewerStatusId,
    });

    return ok({
      reviewerStatus: reviewerStatusDescription,
    } as IResponseCreateReviewerDTO);
  }
}
