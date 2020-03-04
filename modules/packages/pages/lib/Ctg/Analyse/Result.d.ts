/// <reference types="react" />
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
declare const ScoringMethod: (props: IProps) => JSX.Element;
interface IProps {
    ctgData: any;
    docid: string;
    v: Suit;
    [x: string]: any;
}
export default ScoringMethod;
