import { Column, Entity } from 'typeorm';

import { PermissionModel } from '@models/permission.model';

import { BaseEntity } from './_base.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity implements PermissionModel {
  @Column()
  role: string;

  // @ManyToMany(() => UserEntity, {
  //   eager: true,
  //   cascade: true,
  // })
  // @JoinTable({
  //   name: 'permissions_users',
  //   joinColumns: [{ name: 'permission_id' }],
  //   inverseJoinColumns: [{ name: 'user_id' }],
  // })
  // users: UserModel[];
}
