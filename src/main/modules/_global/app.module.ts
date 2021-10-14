import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormConfig from '@main/config/typeorm.config';

import { ArticlesModule } from '../articles/articles.module';
import { CoursesModule } from '../courses/courses.module';
import { ReviewersModule } from '../reviewers/reviewers.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    CoursesModule,
    SubjectsModule,
    ReviewersModule,
    TopicsModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
