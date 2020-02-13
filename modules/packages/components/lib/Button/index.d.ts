/// <reference types="react" />
import { ButtonProps } from 'antd/lib/button';
declare type T = ButtonProps & {
    interval?: number;
};
declare const _default: ({ children, onClick, interval, ...others }: T) => JSX.Element;
export default _default;
