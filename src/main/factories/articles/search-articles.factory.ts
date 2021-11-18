import { SearchArticlesController } from '@application/controllers/articles/search-articles.controller';
import { SearchArticlesUseCase } from '@application/use-cases/articles/search-articles.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { SearchArticlesValidator } from '@application/validators/articles/search-articles.validator';

import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeSearchArticlesController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const searchArticlesValidator = new SearchArticlesValidator(
    requiredFieldsValidator,
  );
  const articlesRepository = new ArticlesTypeormRepository();
  const searchArticlesUseCase = new SearchArticlesUseCase(articlesRepository);
  return new SearchArticlesController(
    searchArticlesValidator,
    searchArticlesUseCase,
  );
};
