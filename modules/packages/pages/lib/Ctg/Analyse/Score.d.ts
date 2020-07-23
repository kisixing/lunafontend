/// <reference types="react" />
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { obvue } from "@lianmed/f_types";
interface IProps {
    ctgData: any;
    docid: string;
    v: Suit;
    MARKS: any;
    startTime: any;
    mark: any;
    setMark: any;
    interval: any;
    setInterval: any;
    mapFormToMark: any;
    disabled: boolean;
    initData: obvue.ctg_exams_analyse;
    [x: string]: any;
}
declare const ScoringMethod: (props: IProps) => JSX.Element;
export default ScoringMethod;
