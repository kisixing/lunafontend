
import SockJS from 'sockjs-client';

import Stomp, { Client, Subscription } from 'webstomp-client';
import { Observable } from 'rxjs'; // tslint:disable-line
import { Observer } from 'rxjs/Observer'; // tslint:disable-line
import Storage from 'store';
import { StompService } from './StompService';




export const makeStompService = (() => {

  let stompClient: Client = null;

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

  const sendActivity = () => {
    connection.then(() => {
      stompClient.send(
        '/topic/activity', // destination
        JSON.stringify({ page: window.location.hash }), // body
        {} // header
      );
    });
  };

  const subscribe = () => {
    connection.then(() => {
      stompSubscriber = stompClient.subscribe('/topic/tracker', data => {
        rxSubscriber.next(JSON.parse(data.body));
      });
    });
  };

  const connect = () => {
    if (connectedPromise !== null || stompService) {
      // the connection is already being established
      return;
    }
    connection = createConnection();
    rxObservable = createListener();

    // building absolute path so that websocket doesn't fail when deploying with a context path

    const headers = {};
    let url = "http://transfer.lian-med.com:9987/ws/stomp?access_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTg2MTYyNTM0fQ.QasLwM0f0rJvHuSZrNVuVIFK4NRNC8eHTDDy8ZcIdHRxAKtS_qoOOrezV8d0lvevOYtZLct9oZ485OkIE-q1vg";
    const authToken = Storage.get('jhi-authenticationToken')
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket = new SockJS(url);
    stompClient = Stomp.over(socket);

    stompClient.connect(headers, () => {
      connectedPromise('success');
      connectedPromise = null;
      subscribe();
      sendActivity();
      if (!stompService) {
        window.onhashchange = () => {
          sendActivity();
        };
        stompService = new StompService(stompClient, connection, rxSubscriber);
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

  const receive = () => rxObservable;


  const unsubscribe = () => {
    if (stompSubscriber !== null) {
      stompSubscriber.unsubscribe();
    }
    rxObservable = createListener();
  };

  return () => {
    if (true) {
      connect();
      if (!stompService) {
        receive().subscribe(activity => {
          console.log('stomp receive', activity)
        });
      }
    } else {
      unsubscribe();
      disconnect();
    }
    return {
      subscribe: (path) => {
        connection.then(() => {
          stompSubscriber = stompClient.subscribe(`${path}`, data => {
            rxSubscriber.next(JSON.parse(data.body));
          });
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
      receive(){
        return connection.then(receive)
      }
    }
  };

})()


