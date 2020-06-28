import React from 'react';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
interface IProps {
    mutableSuit: React.MutableRefObject<Suit>;
    onSelect?: (unitId: string) => void;
    unitId: string;
    children: any;
}
declare const _default: React.NamedExoticComponent<IProps>;
export default _default;
