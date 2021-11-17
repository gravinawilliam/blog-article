import { IListSubjectsByCourseIdUseCase } from '@domain/use-cases/subjects/list-subjects-by-course-id.usecase';
import { IListSubjectsByCourseIdValidator } from '@domain/validators/subjects/list-subjects-by-course-id.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ListSubjectsByCourseIdController implements IController {
  constructor(
    private readonly listSubjectsByCourseIdValidator: IListSubjectsByCourseIdValidator,
    private readonly listSubjectsByCourseIdUseCase: IListSubjectsByCourseIdUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { course_id: courseId } = httpRequest.params;

    const validatedSubject = await this.listSubjectsByCourseIdValidator.execute(
      {
        courseId,
      },
    );
    if (validatedSubject.isLeft()) return validatedSubject.value;

    const { subjects } = await this.listSubjectsByCourseIdUseCase.execute({
      courseId,
    });

    return ok(subjects);
  }
}
