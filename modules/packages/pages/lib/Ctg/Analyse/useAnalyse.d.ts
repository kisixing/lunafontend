import { MutableRefObject } from 'react';
import { FormInstance } from 'antd/lib/form';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
declare const _default: (v: Suit, docid: any, fetal: any, setFhr: (index: 1 | 2 | 3) => void) => {
    setMark: (mark: string) => void;
    mark: string;
    MARKS: string[];
    analyse: () => void;
    startTime: number;
    endTime: number;
    setStartTime: import("react").Dispatch<import("react").SetStateAction<number>>;
    interval: number;
    setInterval: import("react").Dispatch<import("react").SetStateAction<number>>;
    Fischer_ref: MutableRefObject<FormInstance>;
    Nst_ref: MutableRefObject<FormInstance>;
    Krebs_ref: MutableRefObject<FormInstance>;
    analysis_ref: MutableRefObject<FormInstance>;
    old_ref: MutableRefObject<{
        [x: string]: any;
    }>;
    analyseLoading: boolean;
};
export default _default;
export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
