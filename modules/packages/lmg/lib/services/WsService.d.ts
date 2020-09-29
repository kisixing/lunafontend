/// <reference types="node" />
import { EventEmitter } from "@lianmed/utils";
import Queue from "../Ecg/Queue";
import { handleMessage } from "./strategies";
import { BedStatus, EWsEvents, EWsStatus, ICache, TWsReqeustType } from './types';
export * from './types';
export * from './useCheckNetwork';
export * from './utils';
export declare const LIMIT_LENGTH: number;
export declare class WsService extends EventEmitter {
    static wsStatus: typeof EWsStatus;
    static _this: WsService;
    static EWsEvents: typeof EWsEvents;
    test_ple: boolean;
    eventNamespace: string;
    isReady: boolean;
    dirty: boolean;
    interval: number;
    RECONNECT_INTERVAL: number;
    span: number;
    offQueue: Queue;
    offstart: boolean;
    pongTimeoutId: NodeJS.Timeout;
    log: any;
    datacache: ICache;
    settingData: {
        [x: string]: string;
    };
    socket: WebSocket;
    offrequest: number;
    strategies: {
        [x: string]: Function;
    };
    BedStatus: typeof BedStatus;
    PENDDING_INTERVAL: number;
    requests: {
        [x in TWsReqeustType]?: (value: unknown) => void;
    };
    handleMessage: typeof handleMessage;
    private _current;
    get current(): string[];
    set current(value: string[]);
    constructor(settingData?: any);
    getUnitId(device_no: number | string, bed_no: number | string): string;
    getCacheItem(data: {
        device_no?: any;
        bed_no?: any;
        [x: string]: any;
    } | string): import("./types").ICacheItem;
    pongIndex: number;
    sendHeard(): void;
    t: number;
    pong(): void;
    pongFailed(): void;
    refreshInterval: number;
    refreshTimeout: any;
    refresh(name?: string): void;
    getDatacache(): Promise<ICache>;
    send(message: string): void;
    sendAsync(type: TWsReqeustType, message: string): Promise<{
        [x: string]: any;
        res: number;
    }>;
    startwork(device_no: string, bed_no: string): void;
    endwork(device_no: string, bed_no: string): void;
    alloc(device_no: any, bed_no: any): Promise<{
        [x: string]: any;
        res: number;
    }>;
    cancelalloc(device_no: any, bed_no: any): Promise<{
        [x: string]: any;
        res: number;
    }>;
    add_fhr(device_no: any, bed_no: any, fetal_num: any): Promise<{
        [x: string]: any;
        res: number;
    }>;
    add_toco(device_no: any, bed_no: any): Promise<{
        [x: string]: any;
        res: number;
    }>;
    setTocozero(device_no: number, bed_no: number): void;
    replace_probe(device_no: number, bed_no: number): Promise<{
        [x: string]: any;
        res: number;
    }>;
    add_probe(device_no: number, bed_no: number): void;
    delay_endwork(device_no: number, bed_no: number, delay_time: number): void;
    sendFocus(id: string): void;
    sendBloodPressure(id: string, isAuto: 0 | 1 | 2 | 3, time?: number): void;
    _emit(name: string, ...value: any[]): void;
    subscribeList: string[];
    subscribe(str: string[]): void;
    getVolume(device_no: number, bed_no: number): void;
    change_volume(device_no: number, bed_no: number, vol: number): void;
    mute_volume(device_no: number, bed_no: number, fetel_no: number, isMute: number): void;
    connectResolve: (value: any) => void;
    convertdocid(unitId: string, doc_id: string): void;
    setcur(id: string, value: number): void;
    getoffline(queue: Queue, doc_id: string, offlineend: number, offstart: boolean): void;
    initfhrdata(data: any, datacache: any, offindex: any, queue: any, offstart: any): void;
    starttask(queue: any, offstart: any): void;
    connect: () => Promise<ICache>;
    dataLimitTimeoutId: NodeJS.Timeout;
    dataLimit(): void;
}
