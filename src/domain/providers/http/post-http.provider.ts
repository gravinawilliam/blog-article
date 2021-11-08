import {
  IParamsPostHttpDTO,
  IResponseHttpResponseDTO,
} from '@dtos/_providers/http/http-provider.dto';

export interface IPostHttp {
  post(params: IParamsPostHttpDTO): Promise<IResponseHttpResponseDTO>;
}
