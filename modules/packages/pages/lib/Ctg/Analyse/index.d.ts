import 'antd/dist/antd.css';
import { FC } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useCtgData } from './useCtgData';
export declare const ANALYSE_SUCCESS_TYPE = "(\u25CF'\u25E1'\u25CF)";
export { useCtgData };
interface IProps {
    onDownload: (url: string) => void;
    docid?: string;
    note?: string;
    id?: string;
    type?: 'default' | 'remote';
    showHistory?: boolean;
}
export declare const Ctg_Analyse: FC<IProps>;
export default Ctg_Analyse;
