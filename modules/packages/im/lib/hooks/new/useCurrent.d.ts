/// <reference types="react" />
import { MessageMap, Message } from "./types";
export declare function useCurrent(chatMessage: MessageMap): {
    currentMessage: Message[];
    setCurrent: import("react").Dispatch<import("react").SetStateAction<string>>;
    current: string;
};
