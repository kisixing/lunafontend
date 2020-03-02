import { MutableRefObject } from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import { FormInstance } from 'antd/lib/form';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
declare const _default: (v: Suit, docid: any, fetal: any, form: FormInstance, cb: (result: IResult) => void) => {
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
    Fisher_ref: MutableRefObject<FormInstance>;
    Nst_ref: MutableRefObject<FormInstance>;
    Kerbs_ref: MutableRefObject<FormInstance>;
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
    rules: Rule[];
}
export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
