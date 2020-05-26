import { Tag } from 'antd';
import React, { memo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import { IAlarm, TAlarmType } from './AlarmStatus';

interface IProps {
    alarm: IAlarm
}
const map: { [x in TAlarmType]: { color: string, star: string, interval: number } } = {
    0: {
        color: 'red',
        star: '*',
        interval: 1000
    },
    1: {
        color: 'red',
        star: '**',
        interval: 500
    },
    2: {
        color: 'red',
        star: '***',
        interval: 250
    }
}


const C = (props: IProps) => {
    const { alarm } = props;
    if (!alarm) return null
    const ref = useRef()
    const flag = useRef(false)
    const config = map[alarm.type]

    useEffect(() => {
        const d = ReactDOM.findDOMNode(ref.current) as HTMLElement
        const id = setInterval(() => {
            d && (d.style.background = flag.current ? config.color : 'transparent');
            flag.current = !flag.current
        }, config.interval)
        return () => {
            return clearInterval(id)
        }
    }, [config])
    return (
        <Tag ref={ref} style={{ border: '2px solid #fff', color: '#fff', display: alarm.text ? 'inline-block' : 'none' }} >
            {config.star}{alarm.text}
        </Tag>


    )


}
export default memo(C);
