import { useEffect, useState } from "react";

import { StompService } from "@lianmed/utils";
import { Message, MessageMap } from "./types";




export const useMessage = (s: StompService) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }
    const [chatMessage, setChatMessage] = useState<MessageMap>({})

    useEffect(() => {
        const event = s.getSessionId().then(s => `/user/${s}/chat`)
        const cb = (data: Message) => {
            const sender = data.sender
            let old = chatMessage[sender] || []
            old = [...old, data]
            setChatMessage({ ...chatMessage, [sender]: old })
        }
        s.on(event, cb)
        return () => {
            s.off(event, cb)
        }
    }, [chatMessage])

    return { chatMessage }

}