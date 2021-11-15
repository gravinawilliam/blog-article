import { ListAllArticlesController } from '@application/controllers/articles/list-all-articles.controller';
import { ListAllArticlesUseCase } from '@application/use-cases/articles/list-all-articles.usecase';

import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeListAllArticlesController = (): IController => {
  const articlesRepository = new ArticlesTypeormRepository();
  const listAllArticlesUseCase = new ListAllArticlesUseCase(articlesRepository);
  return new ListAllArticlesController(listAllArticlesUseCase);
};
