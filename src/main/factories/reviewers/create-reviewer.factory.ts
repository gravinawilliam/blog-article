import { CreateReviewerController } from '@application/controllers/reviewers/create-reviewer.controller';
import { CreateReviewerTransformer } from '@application/transformers/reviwers/create-reviewer.transformer';
import { CreateReviewerUseCase } from '@application/use-cases/reviewers/create-reviewer.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { CreateReviewerValidator } from '@application/validators/reviewers/create-reviewer.validator';

import ReviewerStatusTypeormRepository from '@infra/database/typeorm/repositories/reviewer-status-typeorm.repository';
import ReviewersTypeormRepository from '@infra/database/typeorm/repositories/reviewers-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

import { TokenJwtProvider } from '../../../infra/providers/token-jwt/token-jwt.provider';

export const makeCreateReviewerController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();

  const reviewersRepository = new ReviewersTypeormRepository();
  const createReviewerUseCase = new CreateReviewerUseCase(reviewersRepository);
  const tokenProvider = new TokenJwtProvider();
  const usersRepository = new UsersTypeormRepository();
  const createReviewerValidator = new CreateReviewerValidator(
    requiredFieldsValidator,
    reviewersRepository,
    usersRepository,
    tokenProvider,
  );
  const reviewerStatusRepository = new ReviewerStatusTypeormRepository();
  const createReviewerTransformer = new CreateReviewerTransformer(
    reviewerStatusRepository,
  );
  return new CreateReviewerController(
    createReviewerUseCase,
    createReviewerValidator,
    createReviewerTransformer,
  );
};
