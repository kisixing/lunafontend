import { BedStatus, mapStatusToColor, mapStatusToText } from "@lianmed/lmg/lib/services/WsService";
import { Tag } from 'antd';
import "antd/lib/card/style/index.css";
import "antd/lib/tag/style/index.css";
import React, { memo, useState, useEffect, useRef } from 'react';
import Alarm2 from './Alarm2'
import { event } from "@lianmed/utils";
interface IProps {
    status: BedStatus
    unitId: string
    alarm2Text?: string
    alarm1Text?: string
    alarm0Text?: string
}
export type TAlarmType = 0 | 1 | 2
export interface IAlarm {
    text: string
    type: TAlarmType
    fucked: boolean
    dirty: number
}
function genAlarm(type: TAlarmType, text: string) {
    const target: IAlarm = { type, text, fucked: false, dirty: 0 }
    return target
}

const Status = memo<IProps>(({ alarm2Text, status, alarm0Text, alarm1Text, unitId }) => {
    const intervalId = useRef<NodeJS.Timeout>()
    const interval = useRef(1000)
    const alarmList = useRef<IAlarm[]>([])
    const [current, setCurrent] = useState<IAlarm>()
    useEffect(() => {
        const cb = (_unitId: string, type: TAlarmType, text: string) => {
            if (_unitId !== unitId) return

            const list = alarmList.current
            const old = list.find(_ => _.text === text)

            console.log('item:alarm', _unitId, old,list)

            if (!old) {
                const target = genAlarm(type, text)
                list.push(target)
            }
        }
        event.on('item:alarm', cb)
        return () => {
            event.off('item:alarm', cb)
        }
    }, [unitId])
    useEffect(() => {
        call()

        console.log('call', unitId)

        return () => {
        console.log('clear', unitId)

            clearTimeout(intervalId.current)
        }
    }, [])
    function call() {
        intervalId.current = setTimeout(() => {
            let list = alarmList.current
            console.log('item:alarm---', unitId, list)

            if (!list.length) {
                setCurrent(null)
            } else {
                const head = list.shift()
                setCurrent(head)
            }

            call()
        }, interval.current);
    }



    return !!mapStatusToColor[status] && (
        <>
            {
                current ? <Alarm2 alarm={current} /> : (
                    <Tag style={{ border: '2px solid #fff' }} color={mapStatusToColor[status]}>
                        {mapStatusToText[status]}
                    </Tag>
                )
            }
        </>

    )
})



export default memo(Status);
