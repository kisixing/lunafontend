import { IMessage } from "./types";
export declare function useI(): {
    chatMessage: import("./types").IMessageMap;
    contacts: import("./types").IContact[];
    current: import("./types").IContact;
    currentMessage: IMessage[];
    setCurrentId: (id: string) => void;
    sendTextMessage: (receiver: string, msg: string) => void;
};
