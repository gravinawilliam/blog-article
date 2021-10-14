import { IRequestFindByRoleDTO } from '@dtos/permissions/permissions-repositories.dto';

import { PermissionModel } from '@models/permission.model';

export interface IFindByRoleUsersRepository {
  findByRole(params: IRequestFindByRoleDTO): Promise<PermissionModel[]>;
}
