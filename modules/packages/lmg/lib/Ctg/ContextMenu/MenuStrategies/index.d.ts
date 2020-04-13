import { MutableRefObject } from 'react';
import { PointType } from 'packages/lmg/src/interface';
import { Suit } from '../../Suit';
export interface IMenuProps {
    pType: PointType;
    s: MutableRefObject<Suit>;
    offsetX: MutableRefObject<number>;
    offsetY: MutableRefObject<number>;
}
declare const _default: (props: IMenuProps) => any;
export default _default;
