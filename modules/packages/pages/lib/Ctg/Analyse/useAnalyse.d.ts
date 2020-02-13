/// <reference types="react" />
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { WrappedFormUtils } from 'antd/lib/form/Form';
declare const _default: (v: {
    suit: Suit;
}, docid: any, fetal: any, form: WrappedFormUtils<any>, cb: (result: IResult) => void) => {
    setMark: (mark: string) => void;
    mark: string;
    activeItem: IItem[];
    responseData: {
        [x: string]: IResponseData;
    };
    MARKS: string[];
    analyse: () => void;
    startTime: number;
    setStartTime: import("react").Dispatch<import("react").SetStateAction<number>>;
    interval: number;
    setInterval: import("react").Dispatch<import("react").SetStateAction<number>>;
    modifyData: () => void;
};
export default _default;
interface IResponseData {
    acc?: string;
    dec?: string;
    baseline?: any;
    meanbaseline?: string;
    mark?: string;
    result: string;
    diagnosis?: any;
}
interface IItem {
    key: string;
    label: string;
    message: string;
    required: boolean;
}
export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
