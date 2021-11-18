import { Controller, Get, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeSearchArticlesController } from '@main/factories/articles/search-articles.factory';

@Controller('/articles')
export class SearchArticlesRoute {
  @Get('/search')
  list(@Req() request, @Res() response) {
    return adapterRoute(makeSearchArticlesController())(request, response);
  }
}
