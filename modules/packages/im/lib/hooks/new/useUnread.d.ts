/// <reference types="react" />
import { IMessageMap } from "./types";
export declare const useUnread: () => {
    chatUnread: IMessageMap;
    setChatUnread: import("react").Dispatch<import("react").SetStateAction<IMessageMap>>;
};
