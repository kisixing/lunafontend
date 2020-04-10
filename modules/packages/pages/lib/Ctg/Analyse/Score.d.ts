/// <reference types="react" />
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
interface IProps {
    ctgData: any;
    docid: string;
    v: Suit;
    MARKS: any;
    analyse: any;
    startTime: any;
    mark: any;
    setMark: any;
    interval: any;
    setInterval: any;
    Fischer_ref: any;
    Nst_ref: any;
    Krebs_ref: any;
    disabled: boolean;
    [x: string]: any;
}
declare const ScoringMethod: (props: IProps) => JSX.Element;
export default ScoringMethod;
