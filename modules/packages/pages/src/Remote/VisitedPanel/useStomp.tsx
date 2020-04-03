import { useEffect, useRef } from "react";
import { StompService } from "@lianmed/utils";
import { VisitedData } from ".";
import { onOpen } from "./utils";



export const useStomp = (visitedData: VisitedData, stomp_url: string) => {
    const stompService = useRef(new StompService(stomp_url))

    useEffect(() => {
        const s = stompService.current
        const k = '/topic/ordernotify'
        const cb = () => {
            const target = visitedData.find(_ => _.name === 'remote')
            target && onOpen(target)
        }

        s.on(k, cb)
        return () => {
            s.off(k, cb)
        }
    }, [visitedData])

    return {}
}