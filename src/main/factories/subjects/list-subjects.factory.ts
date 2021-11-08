import { ListSubjectsController } from '@application/controllers/subjects/list-subjects.controller';
import { ListSubjectsUseCase } from '@application/use-cases/subjects/list-subjects.usecase';

import SubjectsTypeormRepository from '@infra/database/typeorm/repositories/subjects-typeorm.repository';

import { IController } from '@shared/interfaces/controller.interface';

export const makeListSubjectsController = (): IController => {
  const subjectsRepository = new SubjectsTypeormRepository();
  const listSubjectsUseCase = new ListSubjectsUseCase(subjectsRepository);
  return new ListSubjectsController(listSubjectsUseCase);
};
