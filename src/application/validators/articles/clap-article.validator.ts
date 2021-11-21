import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByIdArticleRepository } from '@domain/repositories/articles/find-by-id-article.repository';
import { IFindByIdUsersRepository } from '@domain/repositories/users/find-by-id-users.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IClapArticleValidator } from '@domain/validators/articles/clap-article.validator';

import { ClapArticleValidatorDTO } from '@dtos/articles/clap-article.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { badRequest, notFound } from '@shared/utils/http-response';

export class ClapArticleValidator implements IClapArticleValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly tokenProvider: ITokenVerify,
    private readonly articlesRepository: IFindByIdArticleRepository,
    private readonly usersRepository: IFindByIdUsersRepository,
  ) {}

  public async execute({
    articleId,
    authorization,
    clappedHands,
  }: ClapArticleValidatorDTO.Params): ClapArticleValidatorDTO.Result {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [articleId, authorization, clappedHands],
      fieldNames: ['article_id', 'authorization', 'clapped_hands'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);
    const { userId } = tokenValid.value;

    const userExists = await this.usersRepository.findById(userId);
    if (userExists.isLeft()) {
      return left(notFound(new NotFoundModelError('user')));
    }

    const articleExists = await this.articlesRepository.findById({
      articleId,
    });
    if (articleExists.isLeft()) {
      return left(notFound(new NotFoundModelError('article')));
    }
    const { article } = articleExists.value;
    if (article.amountClaps <= 0 && clappedHands === false) {
      return left(badRequest(new Error('cannot withdraw')));
    }

    return right({
      userId,
    });
  }
}
