import { Module } from '@nestjs/common';

import { CreateSubjectRoute } from './routes/create-subject.route';
import { ListSubjectsByCourseIdRoute } from './routes/list-subjects-by-course-id.route';
import { ListSubjectsRoute } from './routes/list-subjects.route';

@Module({
  controllers: [
    CreateSubjectRoute,
    ListSubjectsRoute,
    ListSubjectsByCourseIdRoute,
  ],
  providers: [],
})
export class SubjectsModule {}
