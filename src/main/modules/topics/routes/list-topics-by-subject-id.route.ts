import { Controller, Get, Req, Res } from '@nestjs/common';

import { adapterRoute } from '@main/adapters/express-route-adapter';
import { makeListTopicsBySubjectIdController } from '@main/factories/topics/list-topics-by-subject-id.factory';

@Controller('/topics')
export class ListTopicsBySubjectIdRoute {
  @Get('/list-by-subject-id/:subject_id')
  list(@Req() request, @Res() response) {
    return adapterRoute(makeListTopicsBySubjectIdController())(
      request,
      response,
    );
  }
}
