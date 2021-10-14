import { CreateTopicController } from '@application/controllers/topics/create-topic.controller';
import { CreateTopicUseCase } from '@application/use-cases/topics/create-topic.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { VerifyPermissionValidator } from '@application/validators/_shared/verify-permission.validator';
import { CreateTopicValidator } from '@application/validators/topics/create-topic.validator';

import SubjectsTypeormRepository from '@infra/database/typeorm/repositories/subjects-typeorm.repository';
import TopicsTypeormRepository from '@infra/database/typeorm/repositories/topics-typeorm.repository';
import UsersTypeormRepository from '@infra/database/typeorm/repositories/users-typeorm.repository';
import { TokenJwtProvider } from '@infra/providers/token-jwt/token-jwt.provider';

import { IController } from '@shared/interfaces/controller.interface';

export const makeCreateTopicController = (): IController => {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const subjectsRepository = new SubjectsTypeormRepository();
  const usersRepository = new UsersTypeormRepository();
  const verifyPermissionValidator = new VerifyPermissionValidator(
    usersRepository,
  );
  const topicsRepository = new TopicsTypeormRepository();
  const tokenProvider = new TokenJwtProvider();
  const createTopicValidator = new CreateTopicValidator(
    requiredFieldsValidator,
    tokenProvider,
    verifyPermissionValidator,
    subjectsRepository,
    topicsRepository,
  );
  const createTopicUseCase = new CreateTopicUseCase(topicsRepository);
  return new CreateTopicController(createTopicValidator, createTopicUseCase);
};
