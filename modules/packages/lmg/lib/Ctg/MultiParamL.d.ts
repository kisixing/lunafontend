/// <reference types="react" />
import { IBloodListItem, IMultiParamData } from "../services/types";
import Queue from '../Ecg/Queue';
export declare const MultiParamL: (props: {
    ecgData: IMultiParamData;
    p: Queue;
    bloodList: IBloodListItem[];
}) => JSX.Element;
