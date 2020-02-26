import { EMsgBodyType } from "../types/msg";
export declare const msgTpl: {
    base: {
        error: boolean;
        errorCode: string;
        errorText: string;
        status: string;
        id: string;
        from: string;
        to: string;
        toJid: string;
        time: string;
        type: string;
        body: {};
        ext: {};
        bySelf: boolean;
    };
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
