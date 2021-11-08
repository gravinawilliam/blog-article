import { IListCoursesUseCase } from '@domain/use-cases/courses/list-courses.usecase';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ListCoursesController implements IController {
  constructor(private readonly listCoursesUseCase: IListCoursesUseCase) {}

  async handle(): Promise<IHttpResponse> {
    const courses = await this.listCoursesUseCase.execute();
    return ok(courses);
  }
}
