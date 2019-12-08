import { useEffect, useState, useCallback } from 'react';
import { WsService } from "./WsService";
import { EWsEvents } from './types';

export function useCheckNetwork(fn?: (isOn: boolean) => void) {
    const [v, setV] = useState(true)
    const cb = useCallback((isOn: boolean) => {
        setV(isOn)
        fn && fn(isOn)
    }, [])
    useEffect(() => {
        WsService._this.on(EWsEvents.pong, cb)
        return () => {
            WsService._this.off(EWsEvents.pong, cb)
        }
    }, [])
    return [v]
}

