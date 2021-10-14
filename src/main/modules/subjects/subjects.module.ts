import { Module } from '@nestjs/common';

import { CreateSubjectController } from '@application/controllers/subjects/create-subject.controller';
import { ListSubjectsController } from '@application/controllers/subjects/list-subjects.controller';

import { CreateSubjectRoute } from './routes/create-subject.route';
import { ListSubjectsRoute } from './routes/list-subjects.route';

@Module({
  controllers: [CreateSubjectRoute, ListSubjectsRoute],
  providers: [CreateSubjectController, ListSubjectsController],
})
export class SubjectsModule {}
