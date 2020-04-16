import { MutableRefObject } from 'react';
import { FormInstance } from 'antd/lib/form';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { AnalyseType } from '@lianmed/lmg/lib/interface';
declare const _default: (v: Suit, docid: any, fetal: any, setFhr: (index: 2 | 1 | 3) => void, ctgData: {
    fhr1?: string;
    fhr2?: string;
    fhr3?: string;
    toco?: string;
    fm?: string;
    docid?: string;
    fetalnum?: string;
    fetalposition?: any;
    _fhr1?: string;
    _fhr2?: string;
    _fhr3?: string;
}) => {
    setMark: (mark: AnalyseType) => void;
    mark: AnalyseType;
    MARKS: AnalyseType[];
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
    isToShort: boolean;
};
export default _default;
export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
