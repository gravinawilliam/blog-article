import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ISearchArticlesValidator } from '@domain/validators/articles/search-articles.validator';

import { SearchArticlesValidatorDTO } from '@dtos/articles/search-articles.dto';

import { left, right } from '@shared/utils/either';

export class SearchArticlesValidator implements ISearchArticlesValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
  ) {}

  public execute({
    mostLiked,
    searching,
  }: SearchArticlesValidatorDTO.Params): SearchArticlesValidatorDTO.Result {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [mostLiked, searching],
      fieldNames: ['most_liked', 'searching'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    return right();
  }
}
