import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateSubjectController } from '@main/factories/subjects/create-subject.factory';

@Controller('/subjects')
export class CreateSubjectRoute {
  @Post('/create')
  create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateSubjectController())(request, response);
  }
}
