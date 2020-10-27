import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import React from 'react';
interface IProps {
    mutableSuit: React.MutableRefObject<Promise<Suit>>;
    onSelect?: (unitId: string) => void;
    unitId: string;
    children: any;
    setMaskVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const _default: React.NamedExoticComponent<IProps>;
export default _default;
