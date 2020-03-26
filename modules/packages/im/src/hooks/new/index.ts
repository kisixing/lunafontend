
// import {  StompService } from "@lianmed/utils";

import { useInit } from "./useInit";
// import { useRoster } from "./useRoster";
import { useUnread } from "./useUnread";
import { useMessage } from "./useMessage";
import { useContact } from "./useContact";
import { useCurrentMessage } from "./useCurrentMessage";
import { useCallback, useState } from "react";
import { IMessage, MessageType, IContact } from "./types";
// export { sendTxtMessage } from '../../utils/msgTool'
export function useI(url?: string) {
    // const { conn } = useInit()

    // const { friends } = useRoster(conn)
    // const { chatMessage } = useMessage(conn)
    const [current, setCurrent] = useState<IContact>(null)
    const { stompService } = useInit(url)
    const { chatUnread, setChatUnread } = useUnread()
    const { chatMessage, setChatMessage } = useMessage(stompService, chatUnread, setChatUnread, current)
    const { contacts } = useContact(chatMessage)
    const { currentMessage } = useCurrentMessage(chatMessage, current)

    const sendTextMessage = useCallback(
        (receiver: string, msg: string) => {
            const msgData: IMessage = { type: MessageType.text, receiver, msg }
            stompService.send('/app/sendPrivateMessage', msgData)
        },
        [],
    )

    const setCurrentId = useCallback(
        (id: string) => {
            const target = contacts.find(_ => _.name === id)
            setCurrent(target)

            let old = chatMessage[id] || []
            old = old.map(_ => ({ ..._, unread: false }))
            setChatMessage({ ...chatMessage, [id]: old })

        },
        [contacts]
    )
    return { chatMessage, contacts, current, currentMessage, setCurrentId, sendTextMessage }
}




