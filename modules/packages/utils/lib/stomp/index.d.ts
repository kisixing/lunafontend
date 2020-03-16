export declare const makeStompService: (url: string) => {
    subscribe: (path: any) => void;
    send(path: string, body?: {}, head?: {}): void;
    receive(fn: any): void;
};
