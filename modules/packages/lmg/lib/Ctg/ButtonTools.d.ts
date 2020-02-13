import React from 'react';
import { Suit } from './Suit';
interface IProps {
    ctg?: React.MutableRefObject<Suit>;
    visible: boolean;
}
export declare const ButtonTools: (props: IProps) => JSX.Element;
export {};
