import { TopicModel } from '../../models/topic.model';

export type IParamsCreateArticleValidatorDTO = {
  title: string;
  topicIds: string[];
  authorization: string;
};

export type IResponseCreateArticleValidatorDTO = {
  userId: string;
  topics: TopicModel[];
};

export type IParamsCreateArticleUseCaseDTO = {
  authorId: string;
  reviewerId: string;
  title: string;
  topics: TopicModel[];
};

export type IResponseCreateArticleUseCaseDTO = {
  id: string;
  status: string;
};

export type IParamsCreateArticleRepositoryDTO = {
  authorId: string;
  reviewerId: string;
  status: string;
  title: string;
  topics: TopicModel[];
};

export type IParamsCreateArticleAfterUseCaseTransformerDTO = {
  topicIds: string[];
  articleId: string;
};

export type IResponseCreateArticleBeforeUseCaseTransformerDTO = {
  reviewerId: string;
};

export type IParamsCreateArticleTopicRepositoryDTO = {
  articleId: string;
  topicId: string;
};
