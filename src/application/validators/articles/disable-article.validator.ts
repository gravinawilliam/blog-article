import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByIdArticleRepository } from '@domain/repositories/articles/find-by-id-article.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IDisableArticleValidator } from '@domain/validators/articles/disable-article.validator';

import { DisableArticleValidatorDTO } from '@dtos/articles/disable-article.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { notFound, unauthorized } from '@shared/utils/http-response';

export class DisableArticleValidator implements IDisableArticleValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly tokenProvider: ITokenVerify,
    private readonly articlesRepository: IFindByIdArticleRepository,
  ) {}

  public async execute({
    articleId,
    authorization,
  }: DisableArticleValidatorDTO.Params): DisableArticleValidatorDTO.Result {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [articleId, authorization],
      fieldNames: ['article_id', 'authorization'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);
    const { userId } = tokenValid.value;

    const articleExists = await this.articlesRepository.findById({
      articleId,
    });
    if (articleExists.isLeft()) {
      return left(notFound(new NotFoundModelError('article')));
    }

    const { article } = articleExists.value;

    if (article.authorId !== userId) {
      return left(
        unauthorized(new Error(`The user is not the author of the article`)),
      );
    }

    return right({ article });
  }
}
