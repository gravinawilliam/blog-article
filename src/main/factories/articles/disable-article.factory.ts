import { DisableArticleController } from '@application/controllers/articles/disable-article.controller';
import { DisableArticleUseCase } from '@application/use-cases/articles/disable-article.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { DisableArticleValidator } from '@application/validators/articles/disable-article.validator';

import { ArticleDataReplication } from '@infra/_providers/data-replications/articles/article-data-replication.provider';
import { AxiosHttpProvider } from '@infra/_providers/http/axios.provider';
import { TokenJwtProvider } from '@infra/_providers/token-jwt/token-jwt.provider';
import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeDisableArticleController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const articlesRepository = new ArticlesTypeormRepository();
  const tokenProvider = new TokenJwtProvider();
  const disableArticleValidator = new DisableArticleValidator(
    requiredFieldsValidator,
    tokenProvider,
    articlesRepository,
  );
  const httpRequest = new AxiosHttpProvider();
  const dataReplications = new ArticleDataReplication(httpRequest);
  const disableArticleUseCase = new DisableArticleUseCase(
    articlesRepository,
    dataReplications,
  );
  return new DisableArticleController(
    disableArticleValidator,
    disableArticleUseCase,
  );
};
