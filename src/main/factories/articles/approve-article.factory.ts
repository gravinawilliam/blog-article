import { ApproveArticleController } from '@application/controllers/articles/approve-article.controller';
import { ApproveArticleUseCase } from '@application/use-cases/articles/approve-article.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { ApproveArticleValidator } from '@application/validators/articles/approve-article.validator';

import { TokenJwtProvider } from '@infra/_providers/token-jwt/token-jwt.provider';
import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';
import ReviewersTypeormRepository from '@infra/database/typeorm/repositories/reviewers-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeApproveArticleController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const tokenProvider = new TokenJwtProvider();
  const articlesRepository = new ArticlesTypeormRepository();
  const reviewersRepository = new ReviewersTypeormRepository();
  const approveArticleValidator = new ApproveArticleValidator(
    requiredFieldsValidator,
    tokenProvider,
    reviewersRepository,
    articlesRepository,
  );
  const approveArticleUseCase = new ApproveArticleUseCase(articlesRepository);
  return new ApproveArticleController(
    approveArticleValidator,
    approveArticleUseCase,
  );
};
