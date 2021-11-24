export namespace UserDataReplicationDTO {
  type UserDTO = {
    id: string;
    isReviewer: boolean;
  };

  export type Params = {
    user: UserDTO;
    type: string;
  };

  export type Result = Promise<void>;
}
