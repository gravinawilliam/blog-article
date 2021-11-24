import { UserDataReplicationDTO } from '@dtos/_providers/data-replications/user-data-replication.dto';

export interface IUserDataReplication {
  user(params: UserDataReplicationDTO.Params): UserDataReplicationDTO.Result;
}
