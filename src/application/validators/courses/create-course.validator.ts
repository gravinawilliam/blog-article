import { ITokenVerify } from '@domain/providers/token/token-verify.provider';
import { IFindByNameCoursesRepository } from '@domain/repositories/courses/find-by-name-courses-repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IVerifyPermissionValidator } from '@domain/validators/_shared/verify-permission.validator';
import { ICreateCourseValidator } from '@domain/validators/courses/create-course.validator';

import { IRequestCreateCourseValidatorDTO } from '@dtos/courses/create-course.dto';

import { ConflictParamError } from '@shared/errors/conflict-param.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { conflict } from '@shared/utils/http-response';
// import { badRequest, conflict } from '@shared/utils/http-response';

export class CreateCourseValidator implements ICreateCourseValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly courseRepository: IFindByNameCoursesRepository,
    private readonly verifyPermissionValidator: IVerifyPermissionValidator,
    private readonly tokenProvider: ITokenVerify,
  ) {}

  public async execute({
    name,
    authorization,
  }: IRequestCreateCourseValidatorDTO): Promise<
    Either<IHttpResponse, boolean>
  > {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [name],
      fieldNames: ['name'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const tokenValid = this.tokenProvider.verify({
      authorization,
    });
    if (tokenValid.isLeft()) return left(tokenValid.value);

    const { userId } = tokenValid.value;

    const permissionValidated = await this.verifyPermissionValidator.execute({
      role: 'create-new-course',
      userId,
    });

    if (permissionValidated.isLeft()) return left(permissionValidated.value);

    const course = await this.courseRepository.findByName(name);
    if (course.isRight()) return left(conflict(new ConflictParamError('name')));

    return right(true);
  }
}
