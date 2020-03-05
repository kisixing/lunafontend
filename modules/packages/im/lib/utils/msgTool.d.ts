import { EMsgBodyType, IMessage, TRawMsgType, PartialRawMsg, TAnyMsgType } from "../types/msg";
export declare const msgTpl: {
    txt: {
        type: EMsgBodyType;
        msg: string;
    };
    img: {
        type: EMsgBodyType;
        file_length: number;
        filename: string;
        filetype: string;
        length: number;
        secret: string;
        width: number;
        height: number;
        url: string;
        thumb: string;
        thumb_secret: string;
    };
    file: {
        type: EMsgBodyType;
        file_length: number;
        filename: string;
        filetype: string;
        length: number;
        secret: string;
        width: number;
        height: number;
        url: string;
        thumb: string;
        thumb_secret: string;
    };
    video: {
        type: EMsgBodyType;
        file_length: number;
        filename: string;
        filetype: string;
        length: number;
        secret: string;
        width: number;
        height: number;
        url: string;
        thumb: string;
        thumb_secret: string;
    };
    audio: {
        type: EMsgBodyType;
        file_length: number;
        filename: string;
        filetype: string;
        length: number;
        secret: string;
        width: number;
        height: number;
        url: string;
        thumb: string;
        thumb_secret: string;
    };
};
export declare function msgCopy(message: PartialRawMsg, tplKey: keyof typeof msgTpl): any;
export declare function msgClone(message: TAnyMsgType): IMessage;
export declare function parseFromLocal(message: TAnyMsgType): IMessage;
export declare const sendTxtMessage: (_to: string, chatType: TRawMsgType, data: string) => Promise<unknown>;
