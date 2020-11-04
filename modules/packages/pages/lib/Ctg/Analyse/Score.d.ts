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
    disabled: boolean;
    initData: obvue.ctg_exams_analyse;
    fetchData: Function;
    reAnalyse: Function;
    loading: boolean;
    analyseLoading: boolean;
    showHistory: boolean;
    fetal: any;
    setFetal: any;
    endTime: any;
    mapFormToMark: any;
}
declare const ScoringMethod: (props: IProps) => JSX.Element;
export default ScoringMethod;
