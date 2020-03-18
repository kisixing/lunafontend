import { useEffect, useRef } from "react";
// import request from "@lianmed/request";
import { StompService } from "@lianmed/utils";
import _ from 'lodash'

// const remote_url = ''
const stomp_url = 'transfer.lian-med.com:9987'

export const useInit = () => {
    const stompService = useRef(new StompService(stomp_url))

    useEffect(() => {
        const s = stompService.current
        const k2 = s.getSessionId().then(s => `/user/${s}/chat`)
        const cb2 = (data) => console.log('stomp 22', data)
        s.on(k2, cb2)
        return () => {
            s.off(k2, cb2)
        }
    }, [])

    return { stompService }
}