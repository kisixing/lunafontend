import { ctg_exams_analyse_score } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
declare type TData = ctg_exams_analyse_score['fischerdata'];
export declare function Fischer(_data: TData): {
    ltvvalue: string | number;
    bhrscore: string | number;
    ltvscore: string | number;
    stvscore: string | number;
    accscore: string | number;
    decscore: string | number;
    total: string | number;
    bhrvalue: string | number;
    ltvalue: string | number;
    stvvalue: string | number;
    accvalue: string | number;
    decvalue: string | number;
};
export {};
