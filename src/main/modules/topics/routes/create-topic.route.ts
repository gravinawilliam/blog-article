import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateTopicController } from '@main/factories/topics/create-topic.factory';

@Controller('/topics')
export class CreateTopicRoute {
  @Post('/create')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateTopicController())(request, response);
  }
}
