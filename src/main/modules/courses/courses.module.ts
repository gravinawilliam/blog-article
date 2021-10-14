import { Module } from '@nestjs/common';

import { CreateCourseController } from '@application/controllers/courses/create-course.controller';

import { ListCoursesController } from '../../../application/controllers/courses/list-courses.controller';
import { CreateCourseRoute } from './routes/create-course.route';
import { ListCoursesRoute } from './routes/list-courses.route';

@Module({
  controllers: [CreateCourseRoute, ListCoursesRoute],
  providers: [CreateCourseController, ListCoursesController],
})
export class CoursesModule {}
