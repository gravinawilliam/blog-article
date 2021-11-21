import { Module } from '@nestjs/common';

import { ApproveArticleRoute } from './routes/approve-article.route';
import { ClapArticleRoute } from './routes/clap-article.route';
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
    ClapArticleRoute,
    ApproveArticleRoute,
  ],
  providers: [],
})
export class ArticlesModule {}
