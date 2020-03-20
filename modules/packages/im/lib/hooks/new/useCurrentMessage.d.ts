import { IMessageMap, IMessage, IContact } from "./types";
export declare function useCurrentMessage(chatMessage: IMessageMap, current: IContact): {
    currentMessage: IMessage[];
};
