
// import SockJS from 'sockjs-client';

import  { Client, Subscription } from 'webstomp-client';
// import { Observable } from 'rxjs'; // tslint:disable-line
import { Observer } from 'rxjs/Observer'; // tslint:disable-line
// import Storage from 'store';
import { EventEmitter } from "../Event";

export class StompService extends EventEmitter {
    private stompClient: Client = null;
    private stompSubscribers: { [x: string]: Subscription[] } = {};
    private connection: Promise<any>;
    private rxSubscriber: Observer<any>;
    // private connectedPromise: any = null;
    // private rxObservable: Observable<any>;
    // private alreadyConnectedOnce = false;
    // private stompService: EventEmitter = null



    constructor(stompClient: Client, connection: Promise<any>, rxSubscriber: Observer<any>) {
        super()
        this.stompClient = stompClient
        this.connection = connection
        this.rxSubscriber = rxSubscriber
    }
    on(event: string, listener: (...args: any[]) => void) {
        this.connection.then(() => {
            const stompSubscriber = this.stompClient.subscribe('/topic/tracker', data => {
                this.rxSubscriber.next(JSON.parse(data.body));
            });
            const old = this.stompSubscribers[event] || (this.stompSubscribers[event] = [])
            old.push(stompSubscriber)
        });
        return this
    }
    emit(event: string, body: { [x: string]: any } = {}, head: { [x: string]: any } = {}) {
        this.stompClient.send(
            event, // destination
            JSON.stringify(head), // body
            {} // header
        );
        return true
    };
    removeAllListeners(event: string) {
        const old = this.stompSubscribers[event] || []
        old.forEach(_ => _.unsubscribe)
        this.stompSubscribers[event] = []
        return this
    };
}