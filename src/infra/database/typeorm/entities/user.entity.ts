import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { PermissionModel } from '@models/permission.model';
import { UserModel } from '@models/user.model';

import { BaseEntity } from './_base.entity';
import { PermissionEntity } from './permission.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserModel {
  @Column()
  name: string;

  @ManyToMany(() => PermissionEntity, {})
  @JoinTable({
    name: 'permissions_users',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: PermissionModel[];
}
