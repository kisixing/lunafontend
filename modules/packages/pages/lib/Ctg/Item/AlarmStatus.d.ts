import { BedStatus } from "@lianmed/lmg/lib/services/WsService";
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import React from 'react';
interface IProps {
    status: BedStatus;
    alarm2Text?: string;
    alarm1Text?: string;
    alarm0Text?: string;
}
declare const _default: React.MemoExoticComponent<React.NamedExoticComponent<IProps>>;
export default _default;
