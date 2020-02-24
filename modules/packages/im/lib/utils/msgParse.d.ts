import { EMsgBodyType, TAnyMsgType } from "../types/msg";
export declare const parseFromServer: (message: TAnyMsgType) => {
    status: string;
    body: {
        msg: string;
        type: EMsgBodyType;
        id: string;
        from: string;
        to: string;
        ext?: {
            [x: string]: any;
            file_length: {
                low: number;
                high: number;
                unsigned: number;
            };
        };
        error: boolean;
        errorText: string;
        errorCode: number;
        msgConfig: any;
        time: string;
        status?: any;
    };
    id: string;
    type: string;
    from: string;
    to: string;
    ext?: {
        [x: string]: any;
        file_length: {
            low: number;
            high: number;
            unsigned: number;
        };
    };
    error: boolean;
    errorText: string;
    errorCode: number;
    msgConfig: any;
    time: string;
} | {
    status: string;
    body: {
        type: EMsgBodyType;
        id: string;
        from: string;
        to: string;
        ext?: {
            [x: string]: any;
            file_length: {
                low: number;
                high: number;
                unsigned: number;
            };
        };
        error: boolean;
        errorText: string;
        errorCode: number;
        msgConfig: any;
        time: string;
        status?: any;
    };
    id: string;
    type: string;
    from: string;
    to: string;
    ext?: {
        [x: string]: any;
        file_length: {
            low: number;
            high: number;
            unsigned: number;
        };
    };
    error: boolean;
    errorText: string;
    errorCode: number;
    msgConfig: any;
    time: string;
};
export declare function parse(message: TAnyMsgType, username: string): {
    bySelf: boolean;
    time: number;
    status: string;
    chatId: string;
    body: {
        msg: string;
        type: EMsgBodyType;
        id: string;
        from: string;
        to: string;
        ext?: {
            [x: string]: any;
            file_length: {
                low: number;
                high: number;
                unsigned: number;
            };
        };
        error: boolean;
        errorText: string;
        errorCode: number;
        msgConfig: any;
        time: string;
        status?: any;
    };
    id: string;
    type: string;
    from: string;
    to: string;
    ext?: {
        [x: string]: any;
        file_length: {
            low: number;
            high: number;
            unsigned: number;
        };
    };
    error: boolean;
    errorText: string;
    errorCode: number;
    msgConfig: any;
} | {
    bySelf: boolean;
    time: number;
    status: string;
    chatId: string;
    body: {
        type: EMsgBodyType;
        id: string;
        from: string;
        to: string;
        ext?: {
            [x: string]: any;
            file_length: {
                low: number;
                high: number;
                unsigned: number;
            };
        };
        error: boolean;
        errorText: string;
        errorCode: number;
        msgConfig: any;
        time: string;
        status?: any;
    };
    id: string;
    type: string;
    from: string;
    to: string;
    ext?: {
        [x: string]: any;
        file_length: {
            low: number;
            high: number;
            unsigned: number;
        };
    };
    error: boolean;
    errorText: string;
    errorCode: number;
    msgConfig: any;
};
