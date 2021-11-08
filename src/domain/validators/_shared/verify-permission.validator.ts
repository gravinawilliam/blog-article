import { IRequestVerifyPermission } from '@dtos/_shared/verify-permission.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface IVerifyPermissionValidator {
  execute(
    params: IRequestVerifyPermission,
  ): Promise<Either<IHttpResponse, null>>;
}
