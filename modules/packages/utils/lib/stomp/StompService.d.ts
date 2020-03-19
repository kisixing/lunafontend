import { Observable } from 'rxjs';
import { EventEmitter } from "../Event";
export declare class StompService extends EventEmitter {
    static s: StompService;
    private stompClient;
    private stompSubscribers;
    private connection;
    private rxSubscriber;
    private connectedPromise;
    private rxObservable;
    private stompService;
    private url;
    get _sessionId(): string;
    getSessionId(): Promise<string>;
    config(url: string): void;
    constructor(url?: string);
    createConnection: () => Promise<any>;
    createListener: () => Observable<unknown>;
    connect: () => import("antd/lib/message").MessageType;
    disconnect: () => void;
    unsubscribe: (event: string) => void;
    on(event: string | Promise<string>, listener: ((...args: any[]) => void) & {
        id?: string;
    }): this;
    _on(event: string, listener: ((...args: any[]) => void) & {
        id?: string;
    }): this;
    off(event: string | Promise<string>, listener: ((...args: any[]) => void) & {
        id?: string;
    }): this;
    _off(event: string, listener: ((...args: any[]) => void) & {
        id?: string;
    }): this;
    send(event: string, body?: {
        [x: string]: any;
    }, head?: {
        [x: string]: any;
    }): boolean;
    removeAllListeners(event: string): this;
}
