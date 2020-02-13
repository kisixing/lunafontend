import { Props } from 'react';
import { fabric } from "fabric";
import { ILineOptions } from 'fabric/fabric-impl';
interface IProps extends Props<any> {
    c?: fabric.Canvas;
    points?: number[];
    options?: ILineOptions;
}
declare const FancyCanvas: (props: IProps) => any;
export default FancyCanvas;
