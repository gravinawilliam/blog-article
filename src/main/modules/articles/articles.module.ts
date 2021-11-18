import { Module } from '@nestjs/common';

import { CreateArticleRoute } from './routes/create-article.route';
import { DisableArticleRoute } from './routes/disable-article.route';
import { ListAllArticlesRoute } from './routes/list-all-articles-approved.route';
import { SearchArticlesRoute } from './routes/search-articles.route';

@Module({
  controllers: [
    CreateArticleRoute,
    ListAllArticlesRoute,
    DisableArticleRoute,
    SearchArticlesRoute,
  ],
  providers: [],
})
export class ArticlesModule {}
