
import SockJS from 'sockjs-client';

import Stomp, { Client, Subscription } from 'webstomp-client';
import { Observable } from 'rxjs'; // tslint:disable-line
import { Observer } from 'rxjs/Observer'; // tslint:disable-line
import Storage from 'store';
import { StompService } from './StompService';
import { TOKEN_KEY } from "../constant";

export { StompService }
export const makeStompService = (() => {

  let stompClient: Client = null;

  let s: Subscription[] = []
  let stompSubscriber: Subscription = null;
  let connection: Promise<any>;
  let connectedPromise: any = null;
  let rxObservable: Observable<any>;
  let rxSubscriber: Observer<any>;
  let stompService: StompService = null
  const createConnection = (): Promise<any> => new Promise((resolve, reject) => (connectedPromise = resolve));

  const createListener = (): Observable<any> =>
    new Observable(_subscriber => {
      rxSubscriber = _subscriber;
    });





  const t = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTg2MTYyNTM0fQ.QasLwM0f0rJvHuSZrNVuVIFK4NRNC8eHTDDy8ZcIdHRxAKtS_qoOOrezV8d0lvevOYtZLct9oZ485OkIE-q1vg'

  const connect = (url = "http://transfer.lian-med.com:9987/ws/stomp") => {
    if (connectedPromise !== null || stompService) {
      return;
    }
    connection = createConnection();
    rxObservable = createListener();


    const headers = {};
    const authToken = t || Storage.get(TOKEN_KEY)
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket = new SockJS(url);
    stompClient = Stomp.over(socket);

    stompClient.connect(headers, () => {
      connectedPromise('success');
      connectedPromise = null;
      if (!stompService) {
        stompService = new StompService();
      }
    });
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.disconnect();
      stompClient = null;
    }
    window.onhashchange = () => { };
    stompService = null;
  };



  const unsubscribe = () => {
    s.forEach(_ => _.unsubscribe());
    s = []
    rxObservable = createListener();
  };

  return (url: string) => {
    if (!stompService) {
      connect();
    }
    return {
      subscribe: (type: string) => {
        return connection.then(() => {
          stompSubscriber = stompClient.subscribe(`${type}`, res => {
            let data
            try {
              data = JSON.parse(res.body)
            } catch (error) {
              data = {}
            }
            rxSubscriber.next({ data, type });
          });
          s.push(stompSubscriber)
        });
      },
      send(path: string, body = {}, head = {}) {
        connection.then(() => {
          stompClient.send(
            `${path}`, // destination
            JSON.stringify(body), // body
            head // header
          );
        });
      },
      receive(fn: ({ data: any, type: string }) => void) {
        connection.then(() => {
          rxObservable.subscribe(fn)
        })
      },
      unsubscribe,
      disconnect
    }
  };

})()


