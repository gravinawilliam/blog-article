import { ListAllArticlesApprovedController } from '@application/controllers/articles/list-all-articles-appreved.controller';
import { ListAllArticlesByStatusUseCase } from '@application/use-cases/articles/list-all-articles-by-status.usecase';

import ArticlesTypeormRepository from '@infra/database/typeorm/repositories/articles-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeListAllArticlesController = (): IController => {
  const articlesRepository = new ArticlesTypeormRepository();
  const listAllArticlesByStatusUseCase = new ListAllArticlesByStatusUseCase(
    articlesRepository,
  );
  return new ListAllArticlesApprovedController(listAllArticlesByStatusUseCase);
};
