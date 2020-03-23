
import SockJS from 'sockjs-client';

import Stomp, { Client, Subscription } from 'webstomp-client';
import { Observable } from 'rxjs'; // tslint:disable-line
import { Observer } from 'rxjs/Observer'; // tslint:disable-line
import Storage from 'store';
import { EventEmitter } from "../Event";
import { TOKEN_KEY } from "../constant";
import { message } from "antd";
const t_key = 'access_token'


export class StompService extends EventEmitter {
    static s: StompService
    private stompClient: Client = null;
    private stompSubscribers: { [x: string]: Subscription[] } = {};
    private connection: Promise<any>;
    private rxSubscriber: Observer<any>;
    private connectedPromise: any = null;
    private rxObservable: Observable<any>;
    private stompService: EventEmitter = null
    private url: string



    get _sessionId() {
        const _transport = this.stompClient.ws._transport
        const url = _transport && _transport.url
        return url && /\/([^\/]+)\/websocket/.exec(url)[1]
    }
    getSessionId() {
        return this.connection.then(() => this._sessionId)
    }


    config(url: string) {
        if (!url) return
        if (!url.includes('http://')) {
            url = `http://${url}`
        }
        try {
            const u = new URL(url)
            u.pathname = '/ws/stomp'
            const t = u.searchParams.get(t_key)
            if (!t) {
                const localT: string = Storage.get(TOKEN_KEY) || ''
                u.searchParams.append(t_key, localT.startsWith('Bearer ') ? localT.slice(7) : localT)
            }

            this.url = u.href
        } catch (e) {
            console.log(e)
        }
    }






    constructor(url: string = location.host) {
        super()


        if (StompService.s) {
            return StompService.s
        }
        console.log('new stomservice', url, this);

        // this.stompClient = stompClient
        // this.connection = connection
        // this.rxSubscriber = rxSubscriber
        StompService.s = this
        this.config(url)
        this.connect()
    }


    createConnection = (): Promise<any> => new Promise((resolve, reject) => (this.connectedPromise = resolve));

    createListener = () => new Observable(_subscriber => {
        this.rxSubscriber = _subscriber;
    });







    connect = () => {
        const { url } = this

        if (this.connectedPromise !== null || this.stompService) {
            return;
        }
        this.connection = this.createConnection();
        this.rxObservable = this.createListener();


        const headers = {};
        if (!url) return message.warning('未设置stomp url')
        try {
            const socket = new SockJS(url);
            this.stompClient = Stomp.over(socket);
        } catch (e) {
            console.log(e, url)
        }

        this.stompClient.connect(headers, () => {
            this.connectedPromise('success');
            this.connectedPromise = null;
            this.rxObservable.subscribe(({ data, event }) => {
                this.emit(event, data)
            })
        });
    };

    disconnect = () => {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
        window.onhashchange = () => { };
        this.stompService = null;
    };



    unsubscribe = (event: string) => {
        const old = this.stompSubscribers[event] || []

        old.forEach(_ => _.unsubscribe());

        this.rxObservable = this.createListener();
    };
    on(event: string | Promise<string>, listener: ((...args: any[]) => void) & { id?: string }) {
        console.log('stomservice on');

        if (typeof event === 'string') {
            this._on(event, listener)
        } else {
            event.then(str => {
                this._on(str, listener)
            })
        }
        return this
    }

    _on(event: string, listener: ((...args: any[]) => void) & { id?: string }) {

        super.on(event, listener)
        this.connection.then(() => {
            const stompSubscriber = this.stompClient.subscribe(event, res => {
                let data
                try {
                    data = JSON.parse(res.body)
                } catch (error) {
                    data = {}
                }
                this.rxSubscriber.next({ data, event });
            });
            listener.id = stompSubscriber.id
            console.log('stomservice _on', event, stompSubscriber.id);

            const old = this.stompSubscribers[event] || (this.stompSubscribers[event] = [])
            old.includes(stompSubscriber) || old.push(stompSubscriber)
        });
        return this
    }

    off(event: string | Promise<string>, listener: ((...args: any[]) => void) & { id?: string }) {
        console.log('stomservice off', event);
        if (typeof event === 'string') {
            this._off(event, listener)
        } else {
            event.then(str => {
                this._off(str, listener)
            })
        }
        return this
    }
    _off(event: string, listener: ((...args: any[]) => void) & { id?: string }) {

        super.off(event, listener)
        const old = this.stompSubscribers[event] || []
        const index = old.findIndex(_ => _.id === listener.id)
        console.log('stomservice off__', event, listener.id, index > -1);

        if (index > -1) {
            const t = old.splice(index, 1)[0]
            t.unsubscribe()
        }
        return this
    }
    send(event: string, body: { [x: string]: any } = {}, head: { [x: string]: any } = {}) {
        this.stompClient.send(event, JSON.stringify(body), head);
        return true
    };
    removeAllListeners(event: string) {
        const old = this.stompSubscribers[event] || []
        old.forEach(_ => _.unsubscribe)
        this.stompSubscribers[event] = []
        return this
    };
}