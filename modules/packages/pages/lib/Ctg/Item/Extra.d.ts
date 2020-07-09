import React from 'react';
import { BedStatus } from "@lianmed/lmg/lib/services/WsService";
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { ICtgLayoutTheme } from '../Layout/types';
interface IProps extends ICtgLayoutTheme {
    status: BedStatus;
    suit: Suit;
    onClose?: (e: React.MouseEvent) => void;
    bedname: string;
    unitId: string;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
