import { CreateSubjectController } from '@application/controllers/subjects/create-subject.controller';
import { CreateSubjectUseCase } from '@application/use-cases/subjects/create-subject.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { VerifyPermissionValidator } from '@application/validators/_shared/verify-permission.validator';
import { CreateSubjectValidator } from '@application/validators/subjects/create-subject.validator';

import CoursesTypeormRepository from '@infra/database/typeorm/repositories/courses-typeorm.repository';
import SubjectsTypeormRepository from '@infra/database/typeorm/repositories/subjects-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { TokenJwtProvider } from '@infra/providers/token-jwt/token-jwt.provider';

import { IController } from '@shared/interfaces/controller.interface';

export const makeCreateSubjectController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const subjectsRepository = new SubjectsTypeormRepository();
  const coursesRepository = new CoursesTypeormRepository();
  const usersRepository = new UsersTypeormRepository();
  const verifyPermissionValidator = new VerifyPermissionValidator(
    usersRepository,
  );
  const tokenProvider = new TokenJwtProvider();
  const createSubjectValidator = new CreateSubjectValidator(
    requiredFieldsValidator,
    coursesRepository,
    subjectsRepository,
    verifyPermissionValidator,
    tokenProvider,
  );
  const createSubjectUseCase = new CreateSubjectUseCase(subjectsRepository);
  return new CreateSubjectController(
    createSubjectUseCase,
    createSubjectValidator,
  );
};
