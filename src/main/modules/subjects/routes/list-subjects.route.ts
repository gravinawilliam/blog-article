import { Controller, Get, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeListSubjectsController } from '@main/factories/subjects/list-subjects.factory';

@Controller('/subjects')
export class ListSubjectsRoute {
  @Get('/list')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async list(@Req() request, @Res() response) {
    return adapterRoute(makeListSubjectsController())(request, response);
  }
}
