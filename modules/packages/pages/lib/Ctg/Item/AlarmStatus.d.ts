import React from 'react';
import { BedStatus } from "@lianmed/lmg/lib/services/WsService";
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
interface IProps {
    status: BedStatus;
    suit: Suit;
    onClose?: (e: React.MouseEvent) => void;
    bedname: string;
}
declare const C: (props: IProps) => JSX.Element;
export default C;
