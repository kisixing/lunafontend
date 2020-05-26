import React, { PropsWithChildren } from 'react';
import { ICacheItem, BedStatus } from "@lianmed/lmg/lib/services/WsService";
import { Drawer } from '@lianmed/lmg/lib/interface';
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
interface IProps extends PropsWithChildren<{}> {
    status?: BedStatus;
    data: ICacheItem;
    bedname: string;
    name: string;
    age: string;
    bedNO: string;
    startTime: string;
    GP: string;
    gestationalWeek: string;
    onDoubleClick?: (e: React.MouseEvent) => void;
    onClose?: (e: React.MouseEvent) => void;
    loading?: boolean;
    onSuitRead?: (s: Drawer) => void;
    themeColor?: string;
    unitId: string;
}
declare const Item: (props: IProps) => JSX.Element;
export default Item;
