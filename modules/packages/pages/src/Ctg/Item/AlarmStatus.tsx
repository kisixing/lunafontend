import { BedStatus, mapStatusToColor, mapStatusToText } from "@lianmed/lmg/lib/services/WsService";
import { Tag } from 'antd';
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import React, { memo } from 'react';
import Alarm2 from './Alarm2'
interface IProps {
    status: BedStatus
    alarmStatus: string

}

const Status = memo<IProps>(({ alarmStatus, status }) => {
    //@ts-ignore
    const r = <marquee style={{  width: 100, display: 'inline-block', verticalAlign: 'bottom' }}><Alarm2 alarmText={alarmStatus} /></marquee>
    return !!mapStatusToColor[status] && (
        <>
            {
                alarmStatus ? r : (
                    <Tag style={{ border: '2px solid #fff' }} color={mapStatusToColor[status]}>
                        {mapStatusToText[status]}
                    </Tag>
                )
            }
        </>

    )
})



export default memo(Status);
