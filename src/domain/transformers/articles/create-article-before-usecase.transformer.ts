import { IResponseCreateArticleBeforeUseCaseTransformerDTO } from '@dtos/articles/create-article.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

//* returns an available reviewer for article review
export interface ICreateArticleBeforeUseCaseTransformer {
  execute(): Promise<
    Either<IHttpResponse, IResponseCreateArticleBeforeUseCaseTransformerDTO>
  >;
}
