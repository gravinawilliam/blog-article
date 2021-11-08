import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateReviewerController } from '@main/factories/reviewers/create-reviewer.factory';

@Controller('/reviewers')
export class CreateReviewerRoute {
  @Post('/create')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateReviewerController())(request, response);
  }
}
