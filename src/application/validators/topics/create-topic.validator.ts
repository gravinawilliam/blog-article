import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByIdSubjectsRepository } from '@domain/repositories/subjects/find-by-id-subjects.repository';
import { IFindByNameTopicsRepository } from '@domain/repositories/topics/find-by-name-topics.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IVerifyPermissionValidator } from '@domain/validators/_shared/verify-permission.validator';
import { ICreateTopicValidator } from '@domain/validators/topics/create-topic.validator';

import { IRequestCreateTopicValidatorDTO } from '@dtos/topics/create-topic.dto';

import { ConflictParamError } from '@shared/errors/conflict-param.error';
import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest, conflict } from '@shared/utils/http-response';

export class CreateTopicValidator implements ICreateTopicValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly tokenProvider: ITokenVerify,
    private readonly verifyPermissionValidator: IVerifyPermissionValidator,
    private readonly subjectsRepository: IFindByIdSubjectsRepository,
    private readonly topicsRepository: IFindByNameTopicsRepository,
  ) {}

  public async execute({
    authorization,
    name,
    subjectId,
  }: IRequestCreateTopicValidatorDTO): Promise<Either<IHttpResponse, boolean>> {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [name, authorization, subjectId],
      fieldNames: ['name', 'authorization', 'subjectId'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);

    const { userId } = tokenValid.value;

    const permissionValidated = await this.verifyPermissionValidator.execute({
      role: 'create-new-topic',
      userId,
    });

    if (permissionValidated.isLeft()) return left(permissionValidated.value);

    const subject = await this.subjectsRepository.findById(subjectId);
    if (subject.isLeft()) {
      return left(badRequest(new NotFoundModelError('subject')));
    }

    const topicExists = await this.topicsRepository.findByName(name);
    if (topicExists.isRight()) {
      return left(conflict(new ConflictParamError('topic name')));
    }

    return right(true);
  }
}
