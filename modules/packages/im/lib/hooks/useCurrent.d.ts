/// <reference types="react" />
import { IMessageMap } from "./useMessage";
import { IMessage } from "../types/msg";
export declare function useCurrent(chatMessage: IMessageMap): {
    currentMessage: IMessage[];
    setCurrent: import("react").Dispatch<import("react").SetStateAction<string>>;
    current: string;
};
