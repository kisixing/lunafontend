import { ctg_exams_analyse_score, _ctg_exams_analyse } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
declare type TData = ctg_exams_analyse_score['sogcdata'];
export declare function Sogc(_data: TData, analysis: _ctg_exams_analyse['analysis']): {
    bhrscore: string | number;
    ltvvalue: string | number;
    ltvscore: string | number;
    accscore: string | number;
    accvalue: string | number;
    bhrvalue: string | number;
    decscore: string | number;
    decvalue: string | number;
    total: string | number;
    result: string | number;
};
export {};
