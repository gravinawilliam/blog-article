import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { ArticleModel } from '@models/article.model';
import { PermissionModel } from '@models/permission.model';
import { UserModel } from '@models/user.model';

import { BaseEntity } from './_base.entity';
import { ArticleEntity } from './article.entity';
import { PermissionEntity } from './permission.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserModel {
  @Column()
  name: string;

  @Column()
  avatar?: string;

  @ManyToMany(() => PermissionEntity, {})
  @JoinTable({
    name: 'permissions_users',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: PermissionModel[];

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleModel;
}
