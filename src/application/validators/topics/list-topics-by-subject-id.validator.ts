import { IFindByIdSubjectsRepository } from '@domain/repositories/subjects/find-by-id-subjects.repository';
import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IListTopicsBySubjectIdValidator } from '@domain/validators/topics/list-topics-by-subject-id.validator';

import { ListTopicsBySubjectIdValidatorDTO } from '@dtos/topics/list-topics-by-subject-id.dto';

import { NotFoundModelError } from '@shared/errors/not-found-model.error';
import { left, right } from '@shared/utils/either';
import { notFound } from '@shared/utils/http-response';

export class ListTopicsBySubjectIdValidator
  implements IListTopicsBySubjectIdValidator
{
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
    private readonly subjectRepository: IFindByIdSubjectsRepository,
  ) {}

  public async execute({
    subjectId,
  }: ListTopicsBySubjectIdValidatorDTO.Params): ListTopicsBySubjectIdValidatorDTO.Result {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [subjectId],
      fieldNames: ['subject_id'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    const subject = await this.subjectRepository.findById(subjectId);
    if (subject.isLeft()) {
      return left(notFound(new NotFoundModelError('subject')));
    }

    return right();
  }
}
