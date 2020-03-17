export declare const makeStompService: (url: string) => {
    subscribe: (type: string) => Promise<void>;
    send(path: string, body?: {}, head?: {}): void;
    receive(fn: ({ data: any, type: string }: {
        data: any;
        type: any;
    }) => void): void;
    unsubscribe: () => void;
    disconnect: () => void;
};
