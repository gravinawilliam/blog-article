import { IListTopicsBySubjectIdUseCase } from '@domain/use-cases/topics/list-topics-by-subject-id.usecase';
import { IListTopicsBySubjectIdValidator } from '@domain/validators/topics/list-topics-by-subject-id.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ListTopicsBySubjectIdController implements IController {
  constructor(
    private readonly listTopicsBySubjectIdValidator: IListTopicsBySubjectIdValidator,
    private readonly listTopicsBySubjectIdUseCase: IListTopicsBySubjectIdUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { subject_id: subjectId } = httpRequest.params;

    const validatedSubject = await this.listTopicsBySubjectIdValidator.execute({
      subjectId,
    });
    if (validatedSubject.isLeft()) return validatedSubject.value;

    const { topics } = await this.listTopicsBySubjectIdUseCase.execute({
      subjectId,
    });

    return ok(topics);
  }
}
