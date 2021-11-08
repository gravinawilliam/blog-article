import { CreateCourseController } from '@application/controllers/courses/create-course.controller';
import { CreateCourseUseCase } from '@application/use-cases/courses/create-course.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { VerifyPermissionValidator } from '@application/validators/_shared/verify-permission.validator';
import { CreateCourseValidator } from '@application/validators/courses/create-course.validator';

import { TokenJwtProvider } from '@infra/_providers/token-jwt/token-jwt.provider';
import CoursesTypeormRepository from '@infra/database/typeorm/repositories/courses-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeCreateCourseController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const coursesRepository = new CoursesTypeormRepository();
  const usersRepository = new UsersTypeormRepository();
  const verifyPermissionValidator = new VerifyPermissionValidator(
    usersRepository,
  );
  const tokenProvider = new TokenJwtProvider();
  const createUserValidator = new CreateCourseValidator(
    requiredFieldsValidator,
    coursesRepository,
    verifyPermissionValidator,
    tokenProvider,
  );
  const createCourseUseCase = new CreateCourseUseCase(coursesRepository);
  return new CreateCourseController(createCourseUseCase, createUserValidator);
};
