/// <reference types="react" />
import { IProps as IP } from "../index";
interface IProps extends IP {
    diagnosis: string;
    onTotalChange: (total: number) => void;
    pdfBase64: string;
    setPdfBase64: (s: string) => void;
    empId?: string;
}
declare const Preview: (props: IProps) => JSX.Element;
export default Preview;
