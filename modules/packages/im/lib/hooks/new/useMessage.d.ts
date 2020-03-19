import { StompService } from "@lianmed/utils";
import { IMessageMap } from "./types";
export declare const useMessage: (s: StompService, chatUnread: IMessageMap, setChatUnread: any) => {
    chatMessage: IMessageMap;
};
