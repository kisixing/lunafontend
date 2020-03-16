export declare const makeStompService: () => {
    subscribe: (path: any) => void;
    send(path: string, body?: {}, head?: {}): void;
    receive(fn: any): void;
};
