import React, { PropsWithChildren } from 'react';
import { ICacheItem, BedStatus } from "@lianmed/lmg/lib/services/WsService";
import { Drawer } from '@lianmed/lmg/lib/interface';
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import { ICtgLayoutTheme } from '../Layout/types';
interface IProps extends PropsWithChildren<ICtgLayoutTheme> {
    status?: BedStatus;
    data: ICacheItem;
    bedname: string;
    name: string;
    age: number;
    bedNO: string;
    telephone?: string;
    startTime: string;
    GP: string;
    gestationalWeek: string;
    onDoubleClick?: (e: React.MouseEvent) => void;
    onClose?: (e: React.MouseEvent) => void;
    loading?: boolean;
    onSuitRead?: (s: Drawer) => void;
    themeColor?: string;
    unitId: string;
    isFullscreen: boolean;
    onSelect?: (unitId: string) => void;
    RenderMaskIn: any;
}
declare const Item: (props: IProps) => JSX.Element;
export default Item;
