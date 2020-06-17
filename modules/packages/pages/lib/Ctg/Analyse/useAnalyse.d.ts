import { MutableRefObject } from 'react';
import { FormInstance } from 'antd/lib/form';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { AnalyseType } from '@lianmed/lmg/lib/interface';
import { ctg_exams_analyse_score } from '@lianmed/f_types/lib/obvue/ctg_exams_analyse';
declare const _default: (v: MutableRefObject<Suit>, docid: string, fetal: any, setFhr: (index: 2 | 1 | 3) => void, ctgData: {
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
    setMark(m: AnalyseType): void;
    mark: AnalyseType;
    MARKS: AnalyseType[];
    reAnalyse: () => Promise<void>;
    startTime: number;
    endTime: number;
    setStartTime: import("react").Dispatch<import("react").SetStateAction<number>>;
    interval: number;
    setInterval: import("react").Dispatch<import("react").SetStateAction<number>>;
    mapFormToMark: {
        Fischer_ref: MutableRefObject<FormInstance>;
        Krebs_ref: MutableRefObject<FormInstance>;
        Nst_ref: MutableRefObject<FormInstance>;
        Cst_ref: MutableRefObject<FormInstance>;
        Cstoct_ref: MutableRefObject<FormInstance>;
        Sogc_ref: MutableRefObject<FormInstance>;
        analysis_ref: MutableRefObject<FormInstance>;
    };
    analysis_ref: MutableRefObject<FormInstance>;
    old_ref: MutableRefObject<{
        [x: string]: any;
    }>;
    analyseLoading: boolean;
    isToShort: boolean;
    setAutoFm(s: boolean): void;
    autoFm: boolean;
    initData: {
        analysis?: {
            bhr: number;
            ltv: number;
            stv: number;
            edtimes: number;
            ldtimes: number;
            vdtimes: number;
            acc: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").AccPoint[];
            dec: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").DecPoint[];
            fm: number[];
            fhrbaselineMinute: number[];
            ucdata: {
                ucIndex: number[];
                uctimes: number;
                ucStrong: number;
                uckeeptime: number;
                ucdurationtime: number;
            };
            start: number;
            end: number;
            isSinusoid: boolean;
        };
        score?: ctg_exams_analyse_score;
    };
};
export default _default;
