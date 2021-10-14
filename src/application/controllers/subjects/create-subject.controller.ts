import { ICreateSubjectUseCase } from '@domain/use-cases/subjects/create-subject.usecase';
import { ICreateSubjectValidator } from '@domain/validators/subjects/create-subject.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response';

export class CreateSubjectController implements IController {
  constructor(
    private readonly createSubjectUseCase: ICreateSubjectUseCase,
    private readonly createSubjectValidator: ICreateSubjectValidator,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;
    const { name, course_id: courseId } = httpRequest.body;

    const validatedSubject = await this.createSubjectValidator.execute({
      name,
      courseId,
      authorization,
    });
    if (validatedSubject.isLeft()) return validatedSubject.value;

    const subjectCreated = await this.createSubjectUseCase.execute({
      name,
      courseId,
    });
    return created(subjectCreated);
  }
}
