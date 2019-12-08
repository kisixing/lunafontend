import React, { } from 'react';
import { Tag } from 'antd';

import useItemAlarm from "./useItemAlarm";
import { mapStatusToColor, mapStatusToText, BedStatus } from "@lianmed/lmg/lib/services/WsService";

import "antd/lib/card/style/index.css"
import "antd/lib/tag/style/index.css"
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
interface IProps {
    status: BedStatus
    suit: Suit
}


const C = (props: IProps) => {
    const { status, suit } = props;
    const [alarmStatus] = useItemAlarm(suit)


    return mapStatusToColor[status] && (
        <Tag style={{ border: '2px solid #fff' }} color={alarmStatus ? '#f5222d' : mapStatusToColor[status]}>
            {alarmStatus ? alarmStatus : mapStatusToText[status]}
        </Tag>

    )


}
export default C;
