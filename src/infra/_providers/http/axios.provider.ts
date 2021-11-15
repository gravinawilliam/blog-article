import axios from 'axios';

import { IPostHttp } from '@domain/providers/http/post-http.provider';

import {
  IParamsPostHttpDTO,
  IResponseHttpResponseDTO,
} from '@dtos/_providers/http/http-provider.dto';

export class AxiosHttpProvider implements IPostHttp {
  public async post({
    data,
    url,
  }: IParamsPostHttpDTO): Promise<IResponseHttpResponseDTO> {
    const response = await axios.post(url, data);
    return {
      response,
    };
  }
}
