import { getRepository, Repository } from 'typeorm';

import { IFindByRoleUsersRepository } from '@domain/repositories/permissions/find-by-role-permissions.repository';

import { IRequestFindByRoleDTO } from '@dtos/permissions/permissions-repositories.dto';

import { PermissionModel } from '@models/permission.model';
import { UserModel } from '@models/user.model';

import { Either, left, right } from '@shared/utils/either';

import { IFindByIdUsersRepository } from '../../../../domain/repositories/users/find-by-id-users.repository';
import { UserEntity } from '../entities/user.entity';

export default class UsersTypeormRepository
  implements IFindByRoleUsersRepository, IFindByIdUsersRepository
{
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }

  public async findById(id: string): Promise<Either<undefined, UserModel>> {
    const found = await this.ormRepository.findOne({
      where: { id },
    });
    if (found === undefined) return left(found as undefined);
    return right(found);
  }

  public async findByRole({
    userId,
  }: IRequestFindByRoleDTO): Promise<PermissionModel[] | undefined> {
    const found = await this.ormRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['permissions'],
    });
    return found.permissions;
  }
}
