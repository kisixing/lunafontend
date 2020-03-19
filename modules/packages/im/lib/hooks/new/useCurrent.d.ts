import { IMessageMap, IMessage, IContact } from "./types";
export declare function useCurrent(chatMessage: IMessageMap, contacts: IContact[]): {
    currentMessage: IMessage[];
    setCurrentId: (id: string) => void;
    current: IContact;
};
