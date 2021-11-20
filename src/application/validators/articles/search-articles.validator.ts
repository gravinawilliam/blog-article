import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { ISearchArticlesValidator } from '@domain/validators/articles/search-articles.validator';

import { SearchArticlesValidatorDTO } from '@dtos/articles/search-articles.dto';

import { left, right } from '@shared/utils/either';

export class SearchArticlesValidator implements ISearchArticlesValidator {
  constructor(
    private readonly requiredFieldsValidator: IRequiredFieldsValidator,
  ) {}

  public execute({
    mostClap,
    searching,
  }: SearchArticlesValidatorDTO.Params): SearchArticlesValidatorDTO.Result {
    const requiredFields = this.requiredFieldsValidator.execute({
      fields: [mostClap, searching],
      fieldNames: ['most_clap', 'searching'],
    });
    if (requiredFields.isLeft()) return left(requiredFields.value);

    return right();
  }
}
