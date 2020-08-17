/// <reference types="node" />
/// <reference types="lodash" />
import Draw from '../Draw';
import { PointType } from '../interface';
import ScrollEl from '../ScrollBar/ScrollEl';
import { IBarTool, TLineTool } from '../ScrollBar/useScroll';
import { ICacheItem } from '../services/WsService';
import DrawCTG from './DrawCTG';
import { DrawAnalyse } from './drawTools/DrawAnalyse';
import { DrawSelect } from './drawTools/DrawSelect';
declare type Canvas = HTMLCanvasElement;
declare type Context = CanvasRenderingContext2D;
export declare class Suit extends Draw {
    drawAnalyse: DrawAnalyse;
    drawSelect: DrawSelect;
    needScroll: boolean;
    isOn: boolean;
    emitInterval: number;
    static option: {
        [x: string]: string;
    };
    option: {
        [x: string]: string;
    };
    initFlag: boolean;
    sid: number;
    log: any;
    intervalIds: NodeJS.Timeout[];
    data: ICacheItem;
    starttime: string;
    fetalcount: number;
    type: number;
    currentdot: number;
    currentx: number;
    viewposition: number;
    lineTool: TLineTool;
    scollscale: number;
    buffersize: number;
    curr: number;
    alarmStatus: number;
    ctgconfig: {
        normalarea: string;
        selectarea: string;
        rule: string;
        scale: string;
        primarygrid: string;
        secondarygrid: string;
        fhrcolor: string[];
        tococolor: string;
        alarmcolor: string;
        fmpcolor: string;
        alarm_enable: boolean;
        alarm_high: number;
        alarm_low: number;
        print_interval: number;
        alarm_delay: number;
    };
    fetalposition: {
        fhr1: string;
        fhr2: string;
        fhr3: string;
    };
    printlen: number;
    requestflag: boolean;
    canvasgrid: Canvas;
    contextgrid: Context;
    canvasdata: Canvas;
    contextdata: Context;
    canvasline: Canvas;
    contextline: Context;
    barTool: IBarTool;
    drawobj: DrawCTG;
    dragtimestamp: number;
    interval: number;
    timeout: NodeJS.Timeout;
    rowline: ScrollEl;
    toolbarposition: number;
    get leftViewposition(): number;
    get rightViewPosition(): number;
    set rightViewPosition(value: number);
    constructor(canvasgrid: Canvas, canvasdata: Canvas, canvasline: Canvas, canvasselect: Canvas, canvasanalyse: Canvas, wrap: HTMLElement, barTool: IBarTool, type: number);
    init(data: ICacheItem): void;
    createLine(): void;
    updateBarTool(): void;
    itemAlarm(text: string): void;
    lazyEmit: ((type: string, ...args: any[]) => boolean) & import("lodash").Cancelable;
    alarmHighCount: any[];
    alarmLowCount: any[];
    alarmLow(fetalIndex: number): boolean;
    alarmHigh(fetalIndex: number): boolean;
    alarmOff(fetalIndex?: number): void;
    checkAlarm(fetalIndex: number, cv: number): boolean;
    destroy(): void;
    _resize(): void;
    setfetalposition(fhr1: any, fhr2: any, fhr3: any): void;
    movescoller(): void;
    InitFileData(oriobj: any): {
        fhr: any[][];
        toco: any[];
        fm: any[];
        fetal_num: number;
        index: number;
        starttime: string;
        fetalposition: {};
        analyse: {
            acc: any[];
            dec: any[];
            baseline: any[];
            start: number;
            end: number;
        };
        noOffset: any;
        selectBarHidden: any;
    };
    drawdot(): void;
    timerCtg(dely: any): void;
    onStatusChange(status: boolean): boolean | void;
    getoffline(): void;
    initfhrdata(data: any, datacache: any, offindex: any): void;
    getPointType(x: number, y: number): PointType;
    getBaseY(x: number): number;
}
export {};
