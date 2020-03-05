import { IContact } from "../types";
import { IMessageMap } from "./useMessage";
export declare function useContact(friends: string[], chatMessage: IMessageMap, chatUnread: IMessageMap): {
    contacts: IContact[];
};
