/// <reference types="react" />
import { IProps as IP } from "../index";
interface IProps extends IP {
    wh: {
        w: number;
        h: number;
    };
    empId?: string;
    setFetal: any;
    fetal: any;
}
declare const Preview: (props: IProps) => JSX.Element;
export default Preview;
