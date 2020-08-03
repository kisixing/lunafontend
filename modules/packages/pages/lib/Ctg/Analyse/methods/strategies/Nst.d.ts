import { ctg_exams_analyse_score } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
declare type TData = ctg_exams_analyse_score['nstdata'];
export declare function Nst(_data: TData): {
    bhrscore: string | number;
    ltvscore: string | number;
    accdurationscore: string | number;
    accamplscore: string | number;
    fmscore: string | number;
    total: string | number;
    bhrvalue: string | number;
    ltvvalue: string | number;
    accdurationvalue: string | number;
    accamplvalue: string | number;
    fmvalue: string | number;
};
export {};
