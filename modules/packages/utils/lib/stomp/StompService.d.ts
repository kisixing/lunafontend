import { Client } from 'webstomp-client';
import { Observer } from 'rxjs/Observer';
import { EventEmitter } from "../Event";
export declare class StompService extends EventEmitter {
    private stompClient;
    private stompSubscribers;
    private connection;
    private rxSubscriber;
    constructor(stompClient: Client, connection: Promise<any>, rxSubscriber: Observer<any>);
    on(event: string, listener: (...args: any[]) => void): this;
    emit(event: string, body?: {
        [x: string]: any;
    }, head?: {
        [x: string]: any;
    }): boolean;
    removeAllListeners(event: string): this;
}
