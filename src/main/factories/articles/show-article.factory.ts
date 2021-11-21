import { ShowArticleController } from '@application/controllers/articles/show-article.controller';
import { ShowArticleUseCase } from '@application/use-cases/articles/show-article.usecase';

import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeShowArticleController = (): IController => {
  const articlesRepository = new ArticlesTypeormRepository();
  const showArticleUseCase = new ShowArticleUseCase(articlesRepository);
  return new ShowArticleController(showArticleUseCase);
};
