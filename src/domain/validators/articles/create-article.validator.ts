import {
  IParamsCreateArticleValidatorDTO,
  IResponseCreateArticleValidatorDTO,
} from '@dtos/articles/create-article.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateArticleValidator {
  execute(
    params: IParamsCreateArticleValidatorDTO,
  ): Promise<Either<IHttpResponse, IResponseCreateArticleValidatorDTO>>;
}
