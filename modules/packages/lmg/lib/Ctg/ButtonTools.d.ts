import React from 'react';
import { Suit } from './Suit';
import { ICacheItem } from '../services/types';
interface IProps {
    ctg: React.MutableRefObject<Suit>;
    data: ICacheItem;
    visible: boolean;
    className: string;
}
export declare const ButtonTools: (props: IProps) => JSX.Element;
export {};
