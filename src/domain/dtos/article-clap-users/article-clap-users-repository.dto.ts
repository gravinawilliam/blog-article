export namespace CreateArticleClapUserRepositoryDTO {
  export type Params = {
    articleId: string;
    userId: string;
  };

  export type Result = Promise<void>;
}
