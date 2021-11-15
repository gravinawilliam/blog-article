import { Controller, Get, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeListAllArticlesController } from '@main/factories/articles/list-all-articles.factory';

@Controller('/articles')
export class ListAllArticlesRoute {
  @Get('/list-all')
  list(@Req() request, @Res() response) {
    return adapterRoute(makeListAllArticlesController())(request, response);
  }
}
