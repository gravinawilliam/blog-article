import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeClapArticleController } from '@main/factories/articles/clap-article.factory';

@Controller('/articles')
export class ClapArticleRoute {
  @Post('/clap')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeClapArticleController())(request, response);
  }
}
