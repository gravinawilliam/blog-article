import { CreateReviewerController } from '@application/controllers/reviewers/create-reviewer.controller';
import { CreateReviewerUseCase } from '@application/use-cases/reviewers/create-reviewer.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { CreateReviewerValidator } from '@application/validators/reviewers/create-reviewer.validator';

import { UserDataReplication } from '@infra/_providers/data-replications/users/user-data-replication.provider';
import { AxiosHttpProvider } from '@infra/_providers/http/axios.provider';
import { TokenJwtProvider } from '@infra/_providers/token-jwt/token-jwt.provider';
import ReviewersTypeormRepository from '@infra/database/typeorm/repositories/reviewers-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeCreateReviewerController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const reviewersRepository = new ReviewersTypeormRepository();
  const httpRequest = new AxiosHttpProvider();
  const dataReplications = new UserDataReplication(httpRequest);
  const createReviewerUseCase = new CreateReviewerUseCase(reviewersRepository, dataReplications);
  const tokenProvider = new TokenJwtProvider();
  const usersRepository = new UsersTypeormRepository();
  const createReviewerValidator = new CreateReviewerValidator(
    requiredFieldsValidator,
    reviewersRepository,
    usersRepository,
    tokenProvider,
  );
  return new CreateReviewerController(createReviewerUseCase, createReviewerValidator);
};
