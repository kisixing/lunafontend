import { TAnyMsgType, IMessage } from "../types/msg";
export declare const parseFromServer: (message: TAnyMsgType) => IMessage;
export declare function parse(message: TAnyMsgType, username: string): IMessage;
