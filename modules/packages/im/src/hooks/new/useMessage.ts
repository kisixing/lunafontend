import { useEffect, useState, useRef } from "react";
import store from 'store'
import { StompService } from "@lianmed/utils";
import { IMessage, IMessageMap } from "./types";
import { IContact } from "../../types";

const MESSAGE_KEY = 'message_storage'

const m1 = {}

export const useMessage = (s: StompService, chatUnread: IMessageMap, setChatUnread: any, current: IContact) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }
    const [sessionId, setSessionId] = useState(null)
    const dirty = useRef(false)
    const [chatMessage, _setChatMessage] = useState<IMessageMap>(store.get(MESSAGE_KEY) || m1)
    function setChatMessage(data: IMessageMap) {
        _setChatMessage(data)
        store.set(MESSAGE_KEY, data)
    }
    useEffect(() => {
        s.getSessionId().then(s => {
            setSessionId(`/user/${s}/chat`)
        })
    }, [])
    useEffect(() => {
        const cb = (data: IMessage) => {
            const sender = data.sender
            const receiver = data.receiver
            const bySelf = sender === ''
            const targetKey = bySelf ? receiver : sender
            data.unread = (current && current.name) !== (targetKey)
            data.bySelf = bySelf

            let old = chatMessage[targetKey] || []
            old = [...old, data].sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp))
                .reduce((res, _) => {
                    const preIndex = (res.length - 1) < 0 ? 0 : (res.length - 1)
                    const pre = res[preIndex] || { timestamp: new Date(0).toUTCString() }
                    const isHead = (+new Date(_.timestamp) - +new Date(pre.timestamp)) > 1000 * 10
                    _.isHead = isHead
                    return res.concat(_)
                }, [] as IMessage[])
            setChatMessage({ ...chatMessage, [targetKey]: old })
            dirty.current = true
        }

        sessionId && s.on(sessionId, cb)
        return () => {

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


    }, [chatMessage, chatUnread])



    return { chatMessage, setChatMessage }

}