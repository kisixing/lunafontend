/// <reference types="react" />
import { obvue } from "@lianmed/f_types";
interface IProps {
    ctgData: any;
    docid: string;
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
