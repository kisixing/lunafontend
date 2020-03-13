import { Observable } from 'rxjs';
export declare const makeStompService: () => {
    subscribe: (path: any) => void;
    send(path: string, body?: {}, head?: {}): void;
    receive(): Promise<Observable<any>>;
};
