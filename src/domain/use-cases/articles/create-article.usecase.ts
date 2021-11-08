import {
  IParamsCreateArticleUseCaseDTO,
  IResponseCreateArticleUseCaseDTO,
} from '@dtos/articles/create-article.dto';

export interface ICreateArticleUseCase {
  execute(
    params: IParamsCreateArticleUseCaseDTO,
  ): Promise<IResponseCreateArticleUseCaseDTO>;
}
