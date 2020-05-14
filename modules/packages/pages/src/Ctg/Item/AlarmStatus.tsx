import { BedStatus, mapStatusToColor, mapStatusToText } from "@lianmed/lmg/lib/services/WsService";
import { Tag } from 'antd';
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import React, { memo, useState, useEffect } from 'react';
import Alarm2 from './Alarm2'
interface IProps {
    status: BedStatus
    alarm2Text?: string
    alarm1Text?: string
    alarm0Text?: string

}

const Status = memo<IProps>(({ alarm2Text, status, alarm0Text, alarm1Text }) => {

    const [index, setIndex] = useState(alarm2Text ? 2 : (alarm1Text ? 1 : (alarm0Text ? 0 : -1)))
    useEffect(() => {
        const arr = [];
        [alarm0Text, alarm1Text, alarm2Text].forEach((_, i) => {
            _ && arr.push(i)
        })
        let i = arr.reduce((target, next) => {
            if (next > target) {
                target = next
            }
            return target
        }, -1)
        setIndex(arr[i % arr.length] || -1)

        const id = setInterval(() => {
            i++;
            setIndex(arr[i % arr.length] || -1)

        }, 6000)
        return () => {
            clearInterval(id)
        }
    }, [alarm2Text, alarm1Text, alarm0Text])
    //@ts-ignore
    const r = (index !== -1 && (alarm0Text || alarm1Text || alarm2Text)) ? <Alarm2 alarmText={alarm2Text} /> : null
    return !!mapStatusToColor[status] && (
        <>
            {
                r ? r : (
                    <Tag style={{ border: '2px solid #fff' }} color={mapStatusToColor[status]}>
                        {mapStatusToText[status]}
                    </Tag>
                )
            }
        </>

    )
})



export default memo(Status);
