import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { CourseModel } from '@models/course.model';
import { SubjectModel } from '@models/subject.model';
import { TopicModel } from '@models/topic.model';

import { BaseEntity } from './_base.entity';
import { CourseEntity } from './course.entity';
import { TopicEntity } from './topic.entity';

@Entity('subjects')
export class SubjectEntity extends BaseEntity implements SubjectModel {
  @Column()
  name: string;

  @Column()
  courseId: string;

  @ManyToOne(() => CourseEntity, (course) => course.subjects)
  course: CourseModel;

  @OneToMany(() => TopicEntity, (topic) => topic.subject)
  topics: TopicModel[];
}
