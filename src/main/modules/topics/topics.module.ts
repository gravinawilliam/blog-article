import { Module } from '@nestjs/common';

import { CreateTopicRoute } from './routes/create-topic.route';
import { ListTopicsBySubjectIdRoute } from './routes/list-topics-by-subject-id.route';

@Module({
  controllers: [CreateTopicRoute, ListTopicsBySubjectIdRoute],
  providers: [],
})
export class TopicsModule {}
