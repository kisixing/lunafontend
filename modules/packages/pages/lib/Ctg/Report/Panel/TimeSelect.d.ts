/// <reference types="react" />
import { IProps as IP } from "../index";
interface IProps extends IP {
    diagnosis: string;
    onTotalChange: (total: string) => void;
    pdfBase64: string;
    setPdfBase64: (s: string) => void;
    empId?: string;
    fetal: any;
    setFetal: any;
}
declare const Preview: (props: IProps) => JSX.Element;
export default Preview;
