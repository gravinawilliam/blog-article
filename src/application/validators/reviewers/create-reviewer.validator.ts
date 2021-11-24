import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByUserIdReviewersRepository } from '@domain/repositories/reviewers/find-by-user-id-reviewers.repository';
import { IFindByIdUsersRepository } from '@domain/repositories/users/find-by-id-users.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ICreateReviewerValidator } from '@domain/validators/reviewers/create-reviewer.validator';

import { CreateReviewerValidatorDTO } from '@dtos/reviewers/create-reviewer.dto';

import { ConflictParamError } from '@shared/errors/conflict-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { conflict, badRequest } from '@shared/utils/http-response';

export class CreateReviewerValidator implements ICreateReviewerValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly reviewersRepository: IFindByUserIdReviewersRepository,
    private readonly usersRepository: IFindByIdUsersRepository,
    private readonly token: ITokenVerify,
  ) {}

  public async execute({
    authorization,
  }: CreateReviewerValidatorDTO.Params): Promise<CreateReviewerValidatorDTO.Result> {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [authorization],
      fieldNames: ['authorization'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.token.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);

    const { userId } = tokenValid.value;

    const userExists = await this.usersRepository.findById(userId);
    if (userExists.isLeft()) {
      return left(badRequest(new NotFoundModelError('user')));
    }

    const userIdExists = await this.reviewersRepository.findByUserId(userId);
    if (userIdExists) return left(conflict(new ConflictParamError('user id')));

    return right({
      user: userExists.value,
    });
  }
}
