import { CreateArticleController } from '@application/controllers/articles/create-article.controller';
import { CreateArticleBeforeUseCaseTransformer } from '@application/transformers/articles/create-article-before-usecase.transformer';
import { CreateArticleUseCase } from '@application/use-cases/articles/create-article.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { CreateArticleValidator } from '@application/validators/articles/create-article.validator';

import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';
import ReviewersTypeormRepository from '@infra/database/typeorm/repositories/reviewers-typeorm.repository';
import TopicsTypeormRepository from '@infra/database/typeorm/repositories/topics-typeorm.repository';
import { TokenJwtProvider } from '@infra/providers/token-jwt/token-jwt.provider';

import { IController } from '@shared/interfaces/controller.interface';

export const makeCreateArticleController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const tokenProvider = new TokenJwtProvider();
  const topicsRepository = new TopicsTypeormRepository();
  const articlesRepository = new ArticlesTypeormRepository();
  const reviewersRepository = new ReviewersTypeormRepository();
  const createArticleBeforeUseCaseTransformer =
    new CreateArticleBeforeUseCaseTransformer(reviewersRepository);
  const createArticleUseCase = new CreateArticleUseCase(articlesRepository);
  const createArticleValidator = new CreateArticleValidator(
    requiredFieldsValidator,
    tokenProvider,
    topicsRepository,
  );
  return new CreateArticleController(
    createArticleValidator,
    createArticleUseCase,
    createArticleBeforeUseCaseTransformer,
  );
};
