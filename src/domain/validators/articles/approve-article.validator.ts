import { ApproveArticleValidatorDTO } from '@dtos/articles/approve-article.dto';

export interface IApproveArticleValidator {
  execute(
    params: ApproveArticleValidatorDTO.Params,
  ): ApproveArticleValidatorDTO.Result;
}
