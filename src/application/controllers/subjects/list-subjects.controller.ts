import { IListSubjectsUseCase } from '@domain/use-cases/subjects/list-subjects.usecase';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ListSubjectsController implements IController {
  constructor(private readonly listSubjectsUseCase: IListSubjectsUseCase) {}

  async handle(): Promise<IHttpResponse> {
    const subjects = await this.listSubjectsUseCase.execute();
    return ok(subjects);
  }
}
