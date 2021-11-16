import { Module } from '@nestjs/common';

import { CreateArticleController } from '@application/controllers/articles/create-article.controller';

import { CreateArticleRoute } from './routes/create-article.route';
import { DisableArticleRoute } from './routes/disable-article.route';
import { ListAllArticlesRoute } from './routes/list-all-articles-approved.route';

@Module({
  controllers: [CreateArticleRoute, ListAllArticlesRoute, DisableArticleRoute],
  providers: [CreateArticleController],
})
export class ArticlesModule {}
