import { IConn } from "../types/conn";
import { IMessageMap } from "./useMessage";
export declare const useUnread: (conn: IConn) => {
    chatUnread: IMessageMap;
};
