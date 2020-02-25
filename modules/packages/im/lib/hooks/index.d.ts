/// <reference types="react" />
import { IContact } from "../types";
export declare function useIm(): {
    friends: string[];
    chatMessage: import("./useMessage").IMessageMap;
    currentContact: IContact;
    setCurrentContact: import("react").Dispatch<import("react").SetStateAction<IContact>>;
    contacts: IContact[];
};
