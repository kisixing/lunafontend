import { BedStatus } from "@lianmed/lmg/lib/services/WsService";
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import React from 'react';
interface IProps {
    status: BedStatus;
    unitId: string;
    alarm2Text?: string;
    alarm1Text?: string;
    alarm0Text?: string;
}
export declare type TAlarmType = 0 | 1 | 2;
export interface IAlarm {
    text: string;
    type: TAlarmType;
    fucked: boolean;
    dirty: number;
}
declare const _default: React.MemoExoticComponent<React.NamedExoticComponent<IProps>>;
export default _default;
