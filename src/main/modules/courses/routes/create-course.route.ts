import { Controller, Post, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeCreateCourseController } from '@main/factories/courses/create-course.factory';

@Controller('/courses')
export class CreateCourseRoute {
  @Post('/create')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(@Req() request, @Res() response) {
    return adapterRoute(makeCreateCourseController())(request, response);
  }
}
