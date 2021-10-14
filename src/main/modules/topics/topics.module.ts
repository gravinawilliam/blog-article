import { Module } from '@nestjs/common';

import { CreateTopicController } from '@application/controllers/topics/create-topic.controller';

import { CreateTopicRoute } from './routes/create-topic.route';

@Module({
  controllers: [CreateTopicRoute],
  providers: [CreateTopicController],
})
export class TopicsModule {}
