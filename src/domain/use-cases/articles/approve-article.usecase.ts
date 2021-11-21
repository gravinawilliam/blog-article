import { ApproveArticleUseCaseDTO } from '@dtos/articles/approve-article.dto';

export interface IApproveArticleUseCase {
  execute(
    params: ApproveArticleUseCaseDTO.Params,
  ): ApproveArticleUseCaseDTO.Result;
}
