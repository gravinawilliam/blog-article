import { ClapArticleController } from '@application/controllers/articles/clap-article.controller';
import { ClapArticleUseCase } from '@application/use-cases/articles/clap-article.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { ClapArticleValidator } from '@application/validators/articles/clap-article.validator';

import { TokenJwtProvider } from '@infra/_providers/token-jwt/token-jwt.provider';
import ArticleClapUsersTypeormRepository from '@infra/database/typeorm/repositories/article-clap-users-typeorm.repository';
import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeClapArticleController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const tokenProvider = new TokenJwtProvider();
  const articlesRepository = new ArticlesTypeormRepository();
  const usersRepository = new UsersTypeormRepository();
  const articleClapUserRepository = new ArticleClapUsersTypeormRepository();
  const clapArticleValidator = new ClapArticleValidator(
    requiredFieldsValidator,
    tokenProvider,
    articlesRepository,
    usersRepository,
  );
  const clapArticleUseCase = new ClapArticleUseCase(
    articleClapUserRepository,
    articlesRepository,
  );
  return new ClapArticleController(clapArticleValidator, clapArticleUseCase);
};
