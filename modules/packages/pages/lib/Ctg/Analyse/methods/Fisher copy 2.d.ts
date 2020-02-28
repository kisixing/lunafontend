import React from 'react';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
interface IProps {
    ctgData: any;
    docid: string;
    v: {
        suit: Suit;
    };
    [x: string]: any;
}
declare const _default: React.ForwardRefExoticComponent<Pick<IProps, React.ReactText> & React.RefAttributes<unknown>>;
export default _default;
