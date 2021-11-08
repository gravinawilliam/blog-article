import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByIdCoursesRepository } from '@domain/repositories/courses/find-by-id-courses.repository';
import { IFindByNameSubjectsRepository } from '@domain/repositories/subjects/find-by-name-subjects.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IVerifyPermissionValidator } from '@domain/validators/_shared/verify-permission.validator';
import { ICreateSubjectValidator } from '@domain/validators/subjects/create-subject.validator';

import { IRequestCreateSubjectValidatorDTO } from '@dtos/subjects/create-subject.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest, conflict } from '@shared/utils/http-response';

import { ConflictParamError } from '../../../shared/errors/conflict-param.error';
import { NotFoundModelError } from '../../../shared/errors/not-found-model.error';

export class CreateSubjectValidator implements ICreateSubjectValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly coursesRepository: IFindByIdCoursesRepository,
    private readonly subjectsRepository: IFindByNameSubjectsRepository,
    private readonly verifyPermissionValidator: IVerifyPermissionValidator,
    private readonly tokenProvider: ITokenVerify,
  ) {}

  public async execute({
    courseId,
    name,
    authorization,
  }: IRequestCreateSubjectValidatorDTO): Promise<
    Either<IHttpResponse, boolean>
  > {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [name, authorization, courseId],
      fieldNames: ['name', 'authorization', 'courseId'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);

    const { userId } = tokenValid.value;

    const permissionValidated = await this.verifyPermissionValidator.execute({
      role: 'create-new-subject',
      userId,
    });

    if (permissionValidated.isLeft()) return left(permissionValidated.value);

    const course = await this.coursesRepository.findById(courseId);
    if (course.isLeft()) {
      return left(badRequest(new NotFoundModelError('Course')));
    }

    const subjectExists = await this.subjectsRepository.findByName(name);
    if (subjectExists.isRight()) {
      return left(conflict(new ConflictParamError('name')));
    }

    return right(true);
  }
}
