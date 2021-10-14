export type IRequestCreateCourseValidatorDTO = {
  name: string;
  authorization: string;
};

export type IRequestCreateCourseUseCaseDTO = {
  name: string;
};

export type IRequestCreateCourseRepositoryDTO = {
  name: string;
};

export type IResponseCreateCourseUseCaseDTO = {
  id: string;
  name: string;
};
