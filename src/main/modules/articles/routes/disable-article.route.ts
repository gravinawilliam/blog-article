import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeDisableArticleController } from '@main/factories/articles/disable-article.factory';

@Controller('/articles')
export class DisableArticleRoute {
  @Post('/disable/:article_id')
  disable(@Req() request, @Res() response) {
    return adapterRoute(makeDisableArticleController())(request, response);
  }
}
