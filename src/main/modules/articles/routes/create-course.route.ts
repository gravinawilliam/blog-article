import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateArticleController } from '@main/factories/articles/create-article.factory';

@Controller('/articles')
export class CreateArticleRoute {
  @Post('/create')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateArticleController())(request, response);
  }
}
