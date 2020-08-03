
import { useState, useEffect, useCallback } from 'react';

// const COEFFICIENT = 240




export default (value, print_interval: number, fetal: number) => {


    // const [pdfBase64, setPdfBase64] = useState(`data:application/pdf;base64,${pdf}`)
    const [startingTime, setStartingTime] = useState<number>(0)
    const [endingTime, setEndingTime] = useState<number>(0)
    const [locking, setLocking] = useState(false)
    const [customizable, setCustomizable] = useState(false)
    const [editable, setEditable] = useState(false)
    const [outputType, _setOutputType] = useState("180")
    const setOutputType = (value) => {
        _setOutputType(value)
    }


    useEffect(() => {
        const current = value.current || {}
        const cb = startingTime => {
            setStartingTime(
                startingTime
            )
            // //TODO: 计算结束时间
            // setEndingTime(
            //     startingTime + print_interval * COEFFICIENT
            // )
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

    useEffect(() => {
        setStartingTime(0)
        setEndingTime(0)
        setEditable(false)
    }, [fetal])
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
        () => value.current.emit('selectBackward') && setEditable(true),
        [value, setEditable],
    )
    const forward = useCallback(
        () => value.current.emit('selectForward') && setEditable(true),
        [value, setEditable],
    )
    const selectAll = useCallback(
        () => value.current.emit('selectAll') && setEditable(true),
        [value, setEditable],
    )

    return {
        editable,
        selectAll,
        startingTime,
        endingTime,
        locking,
        customizable,
        remoteSetStartingTime,
        remoteSetEndingTime,
        toggleLocking,
        toggleCustomiz,
        backward,
        forward,
        outputType,
        setOutputType
    }
}