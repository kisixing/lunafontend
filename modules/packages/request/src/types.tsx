import { ResponseError, RequestOptionsInit } from 'umi-request';

export interface errData {
  status: number;
  errortext: string;
  url: string;
}
export interface RequestOptions extends RequestOptionsInit {
  hideErr?: boolean;
  successText?: string;
  onErr: (err: errData) => any;
}
export type getErrData = (err: ResponseError) => errData;

export interface Iconfig extends RequestOptionsInit {
  errHandler: (err: errData) => any;
  Authorization: string;
  [x: string]: any;
}
