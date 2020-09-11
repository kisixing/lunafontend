import { WsService } from "../WsService";
export declare const strategies: {
    [x: string]: Function;
};
export declare function getStrategies(context: WsService): {
    [x: string]: Function;
};
export declare function handleMessage(this: WsService, mesName: string, mes: any): void;
