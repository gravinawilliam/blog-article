import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByIdsTopicsRepository } from '@domain/repositories/topics/find-by-ids-topics.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ICreateArticleValidator } from '@domain/validators/articles/create-article.validator';

import {
  IParamsCreateArticleValidatorDTO,
  IResponseCreateArticleValidatorDTO,
} from '@dtos/articles/create-article.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';

export class CreateArticleValidator implements ICreateArticleValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly tokenProvider: ITokenVerify,
    private readonly topicsRepository: IFindByIdsTopicsRepository,
  ) {}

  public async execute({
    authorization,
    title,
    topicIds,
    description,
  }: IParamsCreateArticleValidatorDTO): Promise<
    Either<IHttpResponse, IResponseCreateArticleValidatorDTO>
  > {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [title, authorization, topicIds, description],
      fieldNames: ['title', 'authorization', 'topic_ids', 'description'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);
    const { userId } = tokenValid.value;

    const topicExists = await this.topicsRepository.findByIds(topicIds);
    if (topicExists.isLeft()) return left(topicExists.value);
    const topics = topicExists.value;

    return right({
      userId,
      topics,
    });
  }
}
