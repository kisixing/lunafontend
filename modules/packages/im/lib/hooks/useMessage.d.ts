import { IConn } from "../types/conn";
import { IMessage } from "../types/msg";
export interface IMessageMap {
    [x: string]: IMessage[];
}
export declare const useMessage: (conn: IConn) => {
    chatMessage: IMessageMap;
};
