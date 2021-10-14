export type IRequestCreateReviewerValidatorDTO = {
  authorization: string;
};

export type IResponseCreateReviewerValidatorDTO = {
  userId: string;
};

export type ICreateReviewerDTO = {
  userId: string;
  reviewerStatusId: string;
};

export type IResponseCreateReviewerTransformerDTO = {
  reviewerStatusId: string;
  reviewerStatusDescription: string;
};

export type IRequestCreateReviewerUseCaseDTO = {
  userId: string;
  reviewerStatusId: string;
};

export type IResponseCreateReviewerDTO = {
  reviewerStatus: string;
};
