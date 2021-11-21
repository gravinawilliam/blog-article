import { statusConfig } from '@application/configs/status.config';

import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByIdArticleRepository } from '@domain/repositories/articles/find-by-id-article.repository';
import { IFindByUserIdReviewersRepository } from '@domain/repositories/reviewers/find-by-user-id-reviewers.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IApproveArticleValidator } from '@domain/validators/articles/approve-article.validator';

import { ApproveArticleValidatorDTO } from '@dtos/articles/approve-article.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { UnauthorizedError } from '@shared/errors/unauthorized.error';
import { left, right } from '@shared/utils/either';
import {
  badRequest,
  notFound,
  unauthorized,
} from '@shared/utils/http-response';

export class ApproveArticleValidator implements IApproveArticleValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly tokenProvider: ITokenVerify,
    private readonly reviewersRepository: IFindByUserIdReviewersRepository,
    private readonly articlesRepository: IFindByIdArticleRepository,
  ) {}

  public async execute({
    approved,
    articleId,
    authorization,
  }: ApproveArticleValidatorDTO.Params): ApproveArticleValidatorDTO.Result {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [articleId, authorization, approved],
      fieldNames: ['article_id', 'authorization', 'approved'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);
    const { userId: reviewerId } = tokenValid.value;

    const reviewerExists = await this.reviewersRepository.findByUserId(
      reviewerId,
    );
    if (reviewerExists === undefined) {
      return left(notFound(new NotFoundModelError('reviewer')));
    }

    if (reviewerExists.reviewerStatus !== statusConfig.reviewer.approved) {
      return left(
        unauthorized(
          new UnauthorizedError(
            `${approved ? 'approvearticle' : 'disapprove article'}`,
          ),
        ),
      );
    }

    const articleExists = await this.articlesRepository.findById({
      articleId,
    });
    if (articleExists.isLeft()) {
      return left(notFound(new NotFoundModelError('article')));
    }

    const { article } = articleExists.value;

    if (article.status !== statusConfig.article.pending) {
      return left(badRequest(new Error(`status is different from pending`)));
    }

    if (reviewerId !== article.authorId) {
      return left(
        unauthorized(
          new UnauthorizedError(
            `${approved ? 'approvearticle' : 'disapprove article'}`,
          ),
        ),
      );
    }

    return right({ reviewerId });
  }
}
