import { useEffect, useState, useRef } from "react";

import { StompService } from "@lianmed/utils";
import { IMessage, IMessageMap } from "./types";



const m1 = {}

export const useMessage = (s: StompService, chatUnread: IMessageMap, setChatUnread: any) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }
    const [sessionId, setSessionId] = useState(null)
    const dirty = useRef(false)
    const [chatMessage, setChatMessage] = useState<IMessageMap>(m1)
    useEffect(() => {
        s.getSessionId().then(s => {
            setSessionId(`/user/${s}/chat`)
        })
    }, [])
    useEffect(() => {
        const cb = (data: IMessage) => {
            console.log('zzzz cb');

            data.unread = true
            const sender = data.sender
            let old = chatMessage[sender] || []
            old = [...old, data]
            setChatMessage({ ...chatMessage, [sender]: old })
            dirty.current = true
        }
        console.log('zzzz on');

        sessionId && s.on(sessionId, cb)
        return () => {
            console.log('zzzz off');

            sessionId && s.off(sessionId, cb)
        }
    }, [chatMessage, sessionId])

    useEffect(() => {
        if (dirty.current === true || Object.entries(chatUnread).length > 0) {
            const data = Object.entries(chatUnread).reduce((res, [k, v]) => {
                let old = res[k] || []
                const oldIds = old.map(_ => _.id)
                v = v.filter(_ => !oldIds.includes(_.id))
                old = [...v, ...old]
                return Object.assign({}, res, { [k]: old })
            }, chatMessage)
            setChatMessage(data)
            setChatUnread({})
            dirty.current = false
        }
        console.log('zzzz');


    }, [chatMessage, chatUnread])

    return { chatMessage }

}