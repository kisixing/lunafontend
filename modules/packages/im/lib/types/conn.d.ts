import { TListen } from "./listen";
import { EventEmitter } from "@lianmed/utils";
export interface IConn {
    _event: EventEmitter;
    on(event: string, listener: (...args: any[]) => void): this;
    emit(event: string, ...args: any[]): boolean;
    off(event: string, listener: (...args: any[]) => void): this;
    user: string;
    autoReconnectNumTotal: any;
    autoReconnectNumMax: any;
    apiUrl: string;
    listen: TListen;
    close: () => void;
    subscribe: (data: {
        to: any;
        message: any;
    }) => void;
    getRoster: (data: {
        success: (roster: {
            name: string;
            subscription: string;
            jid: {
                appKey: string;
                name: string;
                domain: string;
                clientResource: string;
            };
        }[]) => void;
        error?: (error: any) => void;
    }) => void;
    open: (data: {
        apiUrl: string;
        user: string;
        pwd?: string;
        accessToken?: string;
        appKey: string;
        success: (token: {
            access_token: string;
            expires_in: number;
            user: {
                uuid: string;
                type: string;
                created: number;
                modified: number;
                username: string;
                activated: Boolean;
            };
        }) => void;
        error: (e: any) => void;
    }) => void;
    getBlacklist: Function;
}
