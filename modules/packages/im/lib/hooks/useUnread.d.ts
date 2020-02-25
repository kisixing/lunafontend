import { IConn } from "../types/conn";
import { IMessage } from "../types/msg";
export declare const useUnread: (conn: IConn) => {
    chatUnread: {
        [x: string]: IMessage;
    };
};
