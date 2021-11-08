import { CreateArticleController } from '@application/controllers/articles/create-article.controller';
import { CreateArticleBeforeUseCaseTransformer } from '@application/transformers/articles/create-article-before-usecase.transformer';
import { CreateArticleUseCase } from '@application/use-cases/articles/create-article.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { CreateArticleValidator } from '@application/validators/articles/create-article.validator';

import { ArticlesDataReplication } from '@infra/_providers/data-replications/articles/articles-data-replication.provider';
import { TokenJwtProvider } from '@infra/_providers/token-jwt/token-jwt.provider';
import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';
import ReviewersTypeormRepository from '@infra/database/typeorm/repositories/reviewers-typeorm.repository';
import TopicsTypeormRepository from '@infra/database/typeorm/repositories/topics-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

import { AxiosHttpProvider } from '../../../infra/_providers/http/axios.provider';

export const makeCreateArticleController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const tokenProvider = new TokenJwtProvider();
  const topicsRepository = new TopicsTypeormRepository();
  const articlesRepository = new ArticlesTypeormRepository();
  const reviewersRepository = new ReviewersTypeormRepository();
  const createArticleBeforeUseCaseTransformer =
    new CreateArticleBeforeUseCaseTransformer(reviewersRepository);
  const httpRequest = new AxiosHttpProvider();
  const dataReplications = new ArticlesDataReplication(httpRequest);
  const createArticleUseCase = new CreateArticleUseCase(
    articlesRepository,
    dataReplications,
  );
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
