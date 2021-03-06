import { ReviewerModel } from '@models/reviewer.model';
import { UserModel } from '@models/user.model';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export namespace CreateReviewerUseCaseDTO {
  export type Params = {
    user: UserModel;
  };

  export type Result = ReviewerModel;
}

export namespace CreateReviewerRepositoryDTO {
  export type Params = {
    userId: string;
    reviewerStatus: string;
  };

  export type Result = ReviewerModel;
}

export namespace CreateReviewerValidatorDTO {
  export type Params = {
    authorization: string;
  };

  export type Result = Either<
    IHttpResponse,
    {
      user: UserModel;
    }
  >;
}
