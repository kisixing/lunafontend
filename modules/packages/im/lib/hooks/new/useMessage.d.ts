import { StompService } from "@lianmed/utils";
import { MessageMap } from "./types";
export declare const useMessage: (s: StompService) => {
    chatMessage: MessageMap;
};
