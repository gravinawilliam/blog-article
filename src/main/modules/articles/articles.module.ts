import { Module } from '@nestjs/common';

import { CreateArticleController } from '@application/controllers/articles/create-article.controller';

import { CreateArticleRoute } from './routes/create-course.route';

@Module({
  controllers: [CreateArticleRoute],
  providers: [CreateArticleController],
})
export class ArticlesModule {}
