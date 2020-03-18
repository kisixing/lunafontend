import { useEffect, useState } from "react";

import { StompService } from "@lianmed/utils";
import { Message, MessageMap } from "./types";




export const useMessage = (s: StompService, chatUnread: MessageMap) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }
    const [chatMessage, setChatMessage] = useState<MessageMap>({})
    const [chatReceived, setChatReceived] = useState<MessageMap>({})
    useEffect(() => {
        const event = s.getSessionId().then(s => `/user/${s}/chat`)
        const cb = (data: Message) => {
            const sender = data.sender
            let old = chatReceived[sender] || []
            old = [...old, data]
            setChatReceived({ ...chatReceived, [sender]: old })
        }
        s.on(event, cb)
        return () => {
            s.off(event, cb)
        }
    }, [chatReceived])

    useEffect(() => {
        const data = Object.entries(chatUnread).reduce((res, [k, v]) => {
            let old = res[k] || []
            const oldIds = old.map(_ => _.id)
            v = v.filter(_ => !oldIds.includes(_.id))
            old = [...v, ...old]
            return Object.assign({}, res, { [k]: old })
        }, chatReceived)
        setChatMessage(data)
        console.log('dd',data)
    }, [chatReceived, chatUnread])

    return { chatMessage }

}