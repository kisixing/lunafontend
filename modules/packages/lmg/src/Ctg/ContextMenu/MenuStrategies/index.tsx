import { Menu } from 'antd';
import React, { MutableRefObject } from 'react';
import AccPoint from "./AccPoint";
import DecPoint from "./DecPoint";
import { PointType } from 'packages/lmg/src/interface';
import { Suit } from '../../Suit';
const m = {
    AccPoint,
    DecPoint
}

export interface IMenuProps {
    pType: PointType
    s: MutableRefObject<Suit>
    offsetX: MutableRefObject<number>
    offsetY: MutableRefObject<number>
}

export default (props: IMenuProps) => {
    const { pType } = props
    const T = m[pType]
    return (T && T(props)) || (
        <Menu>

        </Menu>
    )
}   