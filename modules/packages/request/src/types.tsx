import { ResponseError, RequestOptionsInit } from 'umi-request';

export interface ErrData {
  status: number;
  errortext: string;
  url: string;
  data: any;
}
export interface RequestOptions extends RequestOptionsInit {
  hideErr?: boolean;
  successText?: string;
}
export type getErrDataType = (err: ResponseError) => ErrData;

export interface Iconfig extends RequestOptionsInit {
  //暴露给用户的全局错误处理
  errHandler?: (err: ErrData) => any;
  Authorization?: string;
  [x: string]: any;
}
