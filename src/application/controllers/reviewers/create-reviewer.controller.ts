import { ICreateReviewerUseCase } from '@domain/use-cases/reviewers/create-reviewer.usecase';
import { ICreateReviewerValidator } from '@domain/validators/reviewers/create-reviewer.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response';

export class CreateReviewerController implements IController {
  constructor(
    private readonly createReviewerUseCase: ICreateReviewerUseCase,
    private readonly createReviewerValidator: ICreateReviewerValidator,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;

    const reviewerValidated = await this.createReviewerValidator.execute({
      authorization,
    });
    if (reviewerValidated.isLeft()) return reviewerValidated.value;

    const { user } = reviewerValidated.value;

    const reviewer = await this.createReviewerUseCase.execute({
      user,
    });

    return created(reviewer);
  }
}
