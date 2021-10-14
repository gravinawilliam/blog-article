import { IFindByReviewingArticlesReviewersRepository } from '@domain/repositories/reviewers/find-by-reviewing-articles.repository';
import { ICreateArticleBeforeUseCaseTransformer } from '@domain/transformers/articles/create-article-before-usecase.transformer';

import { IResponseCreateArticleBeforeUseCaseTransformerDTO } from '@dtos/articles/create-article.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest } from '@shared/utils/http-response';

//* joins the article with the topics
export class CreateArticleBeforeUseCaseTransformer
  implements ICreateArticleBeforeUseCaseTransformer
{
  constructor(
    private readonly reviewersRepository: IFindByReviewingArticlesReviewersRepository,
  ) {}

  public async execute(): Promise<
    Either<IHttpResponse, IResponseCreateArticleBeforeUseCaseTransformerDTO>
  > {
    try {
      const reviewer = await this.reviewersRepository.findBySmaller();
      return right({
        reviewerId: reviewer.id,
      });
    } catch (error) {
      return left(badRequest(error));
    }
  }
}
