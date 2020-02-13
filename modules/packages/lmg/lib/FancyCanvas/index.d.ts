import React, { Props } from 'react';
export { default as Line } from "./Obj/Line";
export { default as Rect } from "./Obj/Rect";
interface IProps extends Props<any> {
    width?: 0;
    height?: 0;
    children?: any;
    style?: React.CSSProperties;
}
export declare const FancyCanvas: (props: IProps) => JSX.Element;
