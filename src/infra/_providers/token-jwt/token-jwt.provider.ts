import { verify } from 'jsonwebtoken';

import { ITokenVerify } from '@domain/providers/token/token-verify.provider';

import {
  IRequestTokenVerify,
  IResponseTokenVerify,
  ITokenPayloadDTO,
} from '@dtos/_providers/tokens/tokens.dto';

import authConfig from '@main/config/auth.config';

import { UnauthorizedError } from '@shared/errors/unauthorized.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, right, left } from '@shared/utils/either';
import { unauthorized } from '@shared/utils/http-response';

export class TokenJwtProvider implements ITokenVerify {
  public verify({
    authorization,
  }: IRequestTokenVerify): Either<IHttpResponse, IResponseTokenVerify> {
    try {
      const [, token] = authorization.split(' ');
      const decoded = verify(token, authConfig.jwt.secret);
      const { sub } = decoded as ITokenPayloadDTO;
      return right({
        userId: sub,
      });
    } catch {
      return left(unauthorized(new UnauthorizedError('Invalid JWT token')));
    }
  }
}
