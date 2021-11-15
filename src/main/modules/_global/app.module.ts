import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';

import envConfig from '@main/config/env.config';
import typeormConfig from '@main/config/typeorm.config';

import { ArticlesModule } from '../articles/articles.module';
import { CoursesModule } from '../courses/courses.module';
import { ReviewersModule } from '../reviewers/reviewers.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: envConfig.sentry.dsn,
      logLevel: LogLevel.Verbose,
      environment: envConfig.sentry.environment,
      tracesSampleRate: 1.0,
    }),
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
