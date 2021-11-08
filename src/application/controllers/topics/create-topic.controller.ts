import { ICreateTopicUseCase } from '@domain/use-cases/topics/create-topic.usecase';
import { ICreateTopicValidator } from '@domain/validators/topics/create-topic.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response';

export class CreateTopicController implements IController {
  constructor(
    private readonly createTopicValidator: ICreateTopicValidator,
    private readonly createTopicUseCase: ICreateTopicUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;
    const { name, subject_id: subjectId } = httpRequest.body;

    const validatedTopic = await this.createTopicValidator.execute({
      name,
      subjectId,
      authorization,
    });
    if (validatedTopic.isLeft()) return validatedTopic.value;

    const createdTopic = await this.createTopicUseCase.execute({
      name,
      subjectId,
    });
    return created(createdTopic);
  }
}
