
import { useState, useEffect, useCallback } from 'react';

const COEFFICIENT = 240




export default (value, print_interval: number): {
    startingTime: number,
    endingTime: number,
    locking: boolean,
    customizable: boolean,
    remoteSetStartingTime: (v: number) => void,
    remoteSetEndingTime: (v: number) => void,
    toggleLocking: () => any,
    toggleCustomiz: () => any
} => {


    // const [pdfBase64, setPdfBase64] = useState(`data:application/pdf;base64,${pdf}`)
    const [startingTime, setStartingTime] = useState<number>(0)
    const [endingTime, setEndingTime] = useState<number>(0)
    const [locking, setLocking] = useState(false)
    const [customizable, setCustomizable] = useState(false)


    useEffect(() => {
        const cb = startingTime => {
            setStartingTime(
                startingTime
            )
            //TODO: 计算结束时间
            setEndingTime(
                startingTime + print_interval * COEFFICIENT
            )
        }
        const cbe = endingTime => {
            console.log('cb')

            setEndingTime(
                endingTime
            )
        }
        value.suit && value.suit.on('startTime', cb).on('endTime', cbe)
        return () => {
            value.suit && value.suit.off('startTime', cb).off('endTime', cb)
        };
    }, [value])


    const toggleLocking = () => {
        const nextV = !locking
        setLocking(nextV)
        value.suit.emit('locking', nextV)
    }
    const toggleCustomiz = () => {
        const nextV = !customizable
        setCustomizable(nextV)
        value.suit.emit('customizing', nextV)
    }
    const remoteSetStartingTime = useCallback(
        (v: number) => {
            setStartingTime(v)
            value.suit.emit('setStartingTime', v)
        },
        [value],
    )
    const remoteSetEndingTime = useCallback(
        (v: number) => {
            setEndingTime(v)
            value.suit.emit('setEndingTime', v)
        },
        [value],
    )

    return {
        startingTime,
        endingTime,
        locking,
        customizable,
        remoteSetStartingTime,
        remoteSetEndingTime,
        toggleLocking,
        toggleCustomiz
    }
}