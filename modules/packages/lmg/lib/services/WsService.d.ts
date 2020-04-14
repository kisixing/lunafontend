/// <reference types="node" />
import { EventEmitter } from "@lianmed/utils";
import Queue from "../Ecg/Queue";
import { EWsStatus, BedStatus, ICache, EWsEvents } from './types';
export * from './types';
export * from './utils';
export * from './useCheckNetwork';
export declare class WsService extends EventEmitter {
    static wsStatus: typeof EWsStatus;
    static _this: WsService;
    static EWsEvents: typeof EWsEvents;
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
    constructor(settingData?: any);
    getUnitId(device_no: number | string, bed_no: number | string): string;
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
    startwork(device_no: string, bed_no: string): void;
    endwork(device_no: string, bed_no: string): void;
    _emit(name: string, ...value: any[]): void;
    setTocozero(device_no: number, bed_no: number): void;
    getVolume(device_no: number, bed_no: number): void;
    change_volume(device_no: number, bed_no: number, vol: number): void;
    mute_volume(device_no: number, bed_no: number, fetel_no: number, isMute: number): void;
    connectResolve: (value: any) => void;
    convertdocid(unitId: string, doc_id: string): void;
    setcur(id: string, value: number): void;
    getoffline(queue: Queue, doc_id: string, offlineend: number, offstart: boolean): void;
    clearbyrest(doc_id: string, is_working: number): void;
    initfhrdata(data: any, datacache: any, offindex: any, queue: any, offstart: any): void;
    starttask(queue: any, offstart: any): void;
    connect: () => Promise<ICache>;
}
