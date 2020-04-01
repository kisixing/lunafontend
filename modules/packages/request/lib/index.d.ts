import { Iconfig, RequestOptions } from './types';
import Request from './Request';
declare class R extends Request {
    TOKEN_KEY: string;
    private hasConfiged;
    configure: {
        [x: string]: any;
    };
    config: (configs?: Iconfig) => Request;
    authenticate: (params: any, c?: Iconfig) => Promise<any>;
    configFromLocation(url?: string): Iconfig;
    configToLocation(url?: string, attachment?: {
        [x: string]: any;
    } & Iconfig): string;
}
declare const r: R;
declare const get: (url: string, options?: RequestOptions) => Promise<any>, post: (url: string, options?: RequestOptions) => Promise<any>, put: (url: string, options?: RequestOptions) => Promise<any>, config: (configs?: Iconfig) => Request;
export { get, post, put, config };
export default r;
