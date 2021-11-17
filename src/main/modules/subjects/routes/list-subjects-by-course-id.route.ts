import { Controller, Get, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeListSubjectsByCourseIdController } from '@main/factories/subjects/list-subjects-by-course-id.factory';

@Controller('/subjects')
export class ListSubjectsByCourseIdRoute {
  @Get('/list-by-course-id/:course_id')
  list(@Req() request, @Res() response) {
    return adapterRoute(makeListSubjectsByCourseIdController())(
      request,
      response,
    );
  }
}
