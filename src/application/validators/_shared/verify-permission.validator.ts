import { IFindByRoleUsersRepository } from '@domain/repositories/permissions/find-by-role-permissions.repository';
import { IVerifyPermissionValidator } from '@domain/validators/_shared/verify-permission.validator';

import { IRequestVerifyPermission } from '@dtos/_shared/verify-permission.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { unauthorized } from '@shared/utils/http-response';

export class VerifyPermissionValidator implements IVerifyPermissionValidator {
  constructor(private readonly usersRepository: IFindByRoleUsersRepository) {}

  public async execute({
    role,
    userId,
  }: IRequestVerifyPermission): Promise<Either<IHttpResponse, null>> {
    const permissions = await this.usersRepository.findByRole({
      userId,
    });

    if (permissions.length === 0) {
      return left(unauthorized(new Error(`O user não ter permissão`)));
    }

    let havePermission = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const permission of permissions) {
      if (role === permission.role) {
        havePermission = true;
      }
    }

    if (havePermission === false) {
      return left(unauthorized(new Error(`O user não ter permissão`)));
    }

    return right(null);
  }
}
