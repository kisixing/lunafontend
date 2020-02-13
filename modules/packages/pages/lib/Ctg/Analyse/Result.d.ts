/// <reference types="react" />
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { IResult } from './useAnalyse';
interface IProps {
    ctgData: any;
    docid: string;
    form: WrappedFormUtils<IResult>;
    v: {
        suit: Suit;
    };
    [x: string]: any;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<(props: IProps) => JSX.Element, Pick<IProps, import("csstype").AnimationIterationCountProperty>>;
export default _default;
