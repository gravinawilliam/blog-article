import { Controller, Get, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeShowArticleController } from '@main/factories/articles/show-article.factory';

@Controller('/articles')
export class ShowArticleRoute {
  @Get('/show/:article_id')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeShowArticleController())(request, response);
  }
}
