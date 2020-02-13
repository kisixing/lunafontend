export declare namespace Hooks {
    const useLogin: (prefix: string, data?: {
        password?: string;
        username?: string;
    }, cb?: () => void) => void;
}
