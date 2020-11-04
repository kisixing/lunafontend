import { RequestMethod } from 'umi-request';
import { Iconfig, RequestOptions } from './types';
declare type RequestType = <T>(url: string, options?: RequestOptions) => Promise<T>;
export default class Request {
    _request: RequestMethod;
    constructor();
    init: (configs?: Iconfig) => void;
    intercept(): void;
    post: RequestType;
    get: RequestType;
    put: RequestType;
    delete: RequestType;
}
export {};
