import { useEffect, useState, useCallback } from "react";
import { event } from "@lianmed/utils";
import { Suit } from "@lianmed/lmg/lib/Ctg/Suit";

export default (suit: Suit) => {
    const [alarmStatus, setAlarmStatus] = useState<string>(null)
    const _setAlarmStatus = useCallback((alarmType) => {
        setAlarmStatus(alarmType)
    }, [])
    useEffect(() => {

        const onCb = (alarmType: string) => {
            event.emit(`Suit:alarmOn`, alarmType)
            _setAlarmStatus(alarmType)
        }
        const offCb = (alarmType: string) => {
            event.emit(`Suit:alarmOff`, alarmType)
            _setAlarmStatus(null)
        }

        suit && suit
            .on('alarmOn', onCb)
            .on('alarmOff', offCb)

        return () => {
            suit && suit
                .off('alarmOn', onCb)
                .off('alarmOff', offCb)
        };
    }, [suit])
    return [alarmStatus]
}