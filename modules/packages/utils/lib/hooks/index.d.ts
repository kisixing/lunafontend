export * from './usePage';
export declare namespace Hooks {
    const useLogin: (prefix: string, data?: {
        [x: string]: any;
        password?: string;
        username?: string;
    }, cb?: () => void, path?: string) => void;
}
