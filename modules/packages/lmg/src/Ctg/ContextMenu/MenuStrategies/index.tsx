import React, { MutableRefObject } from 'react';
import MarkAccPoint from "./MarkAccPoint";
import MarkDecPoint from "./MarkDecPoint";
import EditAccPoint from "./EditAccPoint";
import EditDecPoint from "./EditDecPoint";
import { PointType } from 'packages/lmg/src/interface';
import { Suit } from '../../Suit';
const m = {
    MarkAccPoint,
    MarkDecPoint,
    EditAccPoint,
    EditDecPoint
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
        <div style={{background:'#fff',}}>
            无效点击
        </div>
    )
}   