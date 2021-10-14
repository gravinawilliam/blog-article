export interface IRequestCreateSubjectValidatorDTO {
  name: string;
  courseId: string;
  authorization: string;
}

export type IRequestCreateSubjectUseCaseDTO = {
  name: string;
  courseId: string;
};
