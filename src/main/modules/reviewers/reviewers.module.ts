import { Module } from '@nestjs/common';

import { CreateReviewerController } from '@application/controllers/reviewers/create-reviewer.controller';

import { CreateReviewerRoute } from './routes/create-reviewer.route';

@Module({
  controllers: [CreateReviewerRoute],
  providers: [CreateReviewerController],
})
export class ReviewersModule {}
