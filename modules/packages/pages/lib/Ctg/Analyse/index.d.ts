import 'antd/dist/antd.css';
import { FC } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
export declare const ANALYSE_SUCCESS_TYPE = "(\u25CF'\u25E1'\u25CF)";
export declare const Ctg_Analyse: FC<{
    onDownload: () => void;
    docid?: string;
    note?: string;
    id?: string;
    type?: 'default' | 'remote';
    fetalcount?: number;
    gestationalWeek?: string;
    inpatientNO?: string;
    name?: string;
    startdate?: string;
    age?: any;
}>;
export default Ctg_Analyse;
