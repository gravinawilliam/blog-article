export interface IRequestCreateTopicValidatorDTO {
  name: string;
  subjectId: string;
  authorization: string;
}

export type IRequestCreateTopicUseCaseDTO = {
  name: string;
  subjectId: string;
};
