import React from 'react';
import { getThemeColor, applyAntdTheme } from './util';
interface IProps {
    primaryColor?: string;
    storageName?: string;
    style?: React.CSSProperties;
    placement?: any;
    onChange?: (color: string) => void;
    mask?: boolean;
}
declare type T = React.ForwardRefExoticComponent<IProps & React.RefAttributes<unknown>> & {
    colors?: any;
    P?: any;
};
declare const C: T;
export { C as AntdThemeManipulator, getThemeColor, applyAntdTheme as changeAntdTheme };
