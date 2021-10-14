import { ICreateCourseUseCase } from '@domain/use-cases/courses/create-course.usecase';
import { ICreateCourseValidator } from '@domain/validators/courses/create-course.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response';

export class CreateCourseController implements IController {
  constructor(
    private readonly createCourseUseCase: ICreateCourseUseCase,
    private readonly createCourseValidator: ICreateCourseValidator,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name } = httpRequest.body;
    const { authorization } = httpRequest.headers;

    const validatedCourse = await this.createCourseValidator.execute({
      name,
      authorization,
    });

    if (validatedCourse.isLeft()) return validatedCourse.value;

    const account = await this.createCourseUseCase.execute({
      name,
    });

    return created(account);
  }
}
