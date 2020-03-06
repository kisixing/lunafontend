import { IConn } from '../types/conn';
import { EventEmitter } from '@lianmed/utils';
import { ICbs, TListen } from '../types/listen';
import { parse } from './msgParse';
import { EMsgBodyType } from '../types/msg';
import { EEvents } from '../types';
const CHAT_MSG = EEvents.chatMessage;
export function listenerIntercept(conn: IConn) {
  const event = (conn._event = new EventEmitter());
  conn.on = event.on.bind(event);
  conn.emit = event.on.bind(event);
  conn.off = event.on.bind(event);
  conn.emit = function emit(this: IConn, event: string, ...args: any[]) {
    this._event.emit(event, ...args);
    return true;
  };
  const oldListen = conn.listen.bind(conn) as TListen;
  const user = conn.user;
  conn.listen = function name(this: IConn, cbs: ICbs) {
    const {
      onTextMessage,
      onAudioMessage,
      onVideoMessage,
      onFileMessage,
      onPictureMessage,
      ...others
    } = cbs;

    oldListen({
      ...others,
      onTextMessage(this: IConn, msg) {
        console.log('raw txt msg', msg);
        const _msg = parse({ ...msg, bodyType: EMsgBodyType.txt }, user);
        this._event.emit(CHAT_MSG, _msg);
        onTextMessage && onTextMessage.call(this, _msg);
      },
      onAudioMessage(this: IConn, msg) {
        const _msg = parse({ ...msg, bodyType: EMsgBodyType.audio }, user);
        this._event.emit(CHAT_MSG, _msg);
        onAudioMessage && onAudioMessage.call(this, msg);
      },
      onVideoMessage(this: IConn, msg) {
        const _msg = parse({ ...msg, bodyType: EMsgBodyType.video }, user);
        this._event.emit(CHAT_MSG, _msg);
        onVideoMessage && onVideoMessage.call(this, msg);
      },
      onFileMessage(this: IConn, msg) {
        const _msg = parse({ ...msg, bodyType: EMsgBodyType.file }, user);
        this._event.emit(CHAT_MSG, _msg);
        onFileMessage && onFileMessage.call(this, msg);
      },
      onPictureMessage(this: IConn, msg) {
        const _msg = parse({ ...msg, bodyType: EMsgBodyType.img }, user);
        this._event.emit(CHAT_MSG, _msg);
        onPictureMessage && onPictureMessage.call(this, msg);
      },
    });
  };
  return conn as IConn;
}
