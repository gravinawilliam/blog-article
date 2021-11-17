import { ListTopicsBySubjectIdController } from '@application/controllers/topics/list-topics-by-subject-id.controller';
import { ListTopicsBySubjectIdUseCase } from '@application/use-cases/topics/list-topics-by-subject-id.usecase';
import { RequiredFieldsValidator } from '@application/validators/_shared/required-fields.validator';
import { ListTopicsBySubjectIdValidator } from '@application/validators/topics/list-topics-by-subject-id.validator';

import SubjectsTypeormRepository from '@infra/database/typeorm/repositories/subjects-typeorm.repository';
import TopicsTypeormRepository from '@infra/database/typeorm/repositories/topics-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeListTopicsBySubjectIdController = (): IController => {
  const subjectsRepository = new SubjectsTypeormRepository();
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const topicsRepository = new TopicsTypeormRepository();
  const listTopicsBySubjectIdValidator = new ListTopicsBySubjectIdValidator(
    requiredFieldsValidator,
    subjectsRepository,
  );
  const listSubjectsByCourseIdUseCase = new ListTopicsBySubjectIdUseCase(
    topicsRepository,
  );
  return new ListTopicsBySubjectIdController(
    listTopicsBySubjectIdValidator,
    listSubjectsByCourseIdUseCase,
  );
};
