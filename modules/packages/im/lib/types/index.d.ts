import { IConfig } from "../utils/config";
import { IConn } from "./conn";
export * from './event';
export interface IContact {
    name: string;
    unread?: number;
    latestMessage?: string;
    latestTime?: string;
}
export interface IWebIM {
    aa: string;
    config: IConfig;
    conn: IConn;
    emoji: {
        [x: string]: string;
    };
    statusCode: {
        WEBIM_CONNCTION_DISCONNECTED: any;
        WEBIM_CONNCTION_AUTH_ERROR: any;
        WEBIM_CONNCTION_SERVER_CLOSE_ERROR: any;
        WEBIM_CONNCTION_SERVER_ERROR: any;
        WEBIM_CONNCTION_USER_REMOVED: any;
        WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE: any;
        WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD: any;
        WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE: any;
    };
    call?: {
        listener?: {
            onInvite?: any;
        };
    };
}
export {};
