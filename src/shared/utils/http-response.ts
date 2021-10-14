import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { HttpStatusCode } from '@shared/utils/http-status-code';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error,
});

export const conflict = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.CONFLICT,
  body: error,
});

export const created = (data: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.CREATED,
  body: data,
});

export const unauthorized = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.UNAUTHORIZED,
  body: error,
});

export const ok = (data: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data,
});

export const notFound = (data: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: data,
});
