import { Entity, Column, OneToMany } from 'typeorm';

import { CourseModel } from '@models/course.model';
import { SubjectModel } from '@models/subject.model';

import { BaseEntity } from './_base.entity';
import { SubjectEntity } from './subject.entity';

@Entity('courses')
export class CourseEntity extends BaseEntity implements CourseModel {
  @Column({
    name: 'name',
  })
  name: string;

  @OneToMany(() => SubjectEntity, (subject) => subject.course)
  subjects: SubjectModel[];
}
