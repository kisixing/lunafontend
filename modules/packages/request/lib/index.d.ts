import { Iconfig, RequestOptions } from './types';
import Request from './Request';
declare class R extends Request {
    TOKEN_KEY: string;
    private hasConfiged;
    configure: Iconfig;
    responseInterceptrorUsed: boolean;
    config: (configs?: Iconfig) => Request;
    authenticate: (params: any, c?: Iconfig) => Promise<any>;
    unAuthenticate: () => Promise<unknown>;
    configFromLocation: (url?: string) => Iconfig;
    configToLocation(url?: string, attachment?: {
        [x: string]: any;
    } & Iconfig): string;
    fetchPage: <T extends {}>(model: string, data: {
        [x: string]: any;
        current?: number;
        pageSize?: number;
    }, keyMap?: Record<string, string>) => Promise<{
        data: T[];
        pagination: {
            total: number;
            current: number;
            pageSize: number;
        };
    }>;
}
declare const r: R;
declare const get: <T>(url: string, options?: RequestOptions) => Promise<T>, post: <T>(url: string, options?: RequestOptions) => Promise<T>, put: <T>(url: string, options?: RequestOptions) => Promise<T>, config: (configs?: Iconfig) => Request, fetchPage: <T extends {}>(model: string, data: {
    [x: string]: any;
    current?: number;
    pageSize?: number;
}, keyMap?: Record<string, string>) => Promise<{
    data: T[];
    pagination: {
        total: number;
        current: number;
        pageSize: number;
    };
}>, del: <T>(url: string, options?: RequestOptions) => Promise<T>;
export { get, post, put, del, config, fetchPage };
export default r;
