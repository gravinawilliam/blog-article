import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeApproveArticleController } from '@main/factories/articles/approve-article.factory';

@Controller('/articles')
export class ApproveArticleRoute {
  @Post('/approve')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeApproveArticleController())(request, response);
  }
}
