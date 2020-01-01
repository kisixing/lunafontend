
import { useState, useEffect, useCallback } from 'react';

const COEFFICIENT = 240




export default (value, print_interval: number): {
    startingTime: number,
    endingTime: number,
    locking: boolean,
    customizable: boolean,
    total: number,
    remoteSetStartingTime: (v: number) => void,
    remoteSetEndingTime: (v: number) => void,
    toggleLocking: () => any,
    toggleCustomiz: () => any,
    backward: () => any,
    forward: () => any
} => {


    // const [pdfBase64, setPdfBase64] = useState(`data:application/pdf;base64,${pdf}`)
    const [startingTime, setStartingTime] = useState<number>(0)
    const [endingTime, setEndingTime] = useState<number>(0)
    const [total, setTotal] = useState(0)
    const [locking, setLocking] = useState(true)
    const [customizable, setCustomizable] = useState(false)


    useEffect(() => {
        const resStr = ((endingTime - startingTime) / COEFFICIENT).toFixed(1) || '0'
        setTotal(Number(resStr))
    }, [startingTime, endingTime])

    useEffect(() => {
        const current = value.current || {}
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

            setEndingTime(endingTime)
        }

        current.on && current.on('startTime', cb).on('endTime', cbe)
        return () => {
            current.off && current.off('startTime', cb).off('endTime', cb)
        };
    }, [value])


    const toggleLocking = () => {
        const nextV = !locking
        setLocking(nextV)
        value.current.emit('locking', nextV)
    }
    const toggleCustomiz = () => {
        const nextV = !customizable
        setCustomizable(nextV)
        value.current.emit('customizing', nextV)
    }
    const remoteSetStartingTime = useCallback(
        (v: number) => {
            setStartingTime(v)
            value.current.emit('setStartingTime', v)
        },
        [value],
    )
    const remoteSetEndingTime = useCallback(
        (v: number) => {
            setEndingTime(v)
            value.current.emit('setEndingTime', v)
        },
        [value],
    )
    const backward = useCallback(
        () => value.current.emit('selectBackward'),
        [value],
    )
    const forward = useCallback(
        () => value.current.emit('selectForward'),
        [value],
    )

    return {
        startingTime,
        endingTime,
        locking,
        customizable,
        total,
        remoteSetStartingTime,
        remoteSetEndingTime,
        toggleLocking,
        toggleCustomiz,
        backward,
        forward
    }
}