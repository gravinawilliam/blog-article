import { Controller, Get, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeListCoursesController } from '@main/factories/courses/list-courses.factory';

@Controller('/courses')
export class ListCoursesRoute {
  @Get('/list')
  list(@Req() request, @Res() response) {
    return adapterRoute(makeListCoursesController())(request, response);
  }
}
