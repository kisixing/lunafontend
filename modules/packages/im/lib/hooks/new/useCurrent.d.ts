/// <reference types="react" />
import { IMessageMap, IMessage } from "./types";
export declare function useCurrent(chatMessage: IMessageMap): {
    currentMessage: IMessage[];
    setCurrent: import("react").Dispatch<import("react").SetStateAction<string>>;
    current: string;
};
