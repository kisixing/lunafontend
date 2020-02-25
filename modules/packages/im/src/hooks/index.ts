
import { useEffect, useState } from "react";
import { IContact } from "../types";
import { useInit } from "./useInit";
import { useRoster } from "./useRoster";
import { useUnread } from "./useUnread";
import { useMessage } from "./useMessage";


export function useIm() {
    const { conn } = useInit()
    const [contacts, setContacts] = useState<IContact[]>([])
    const [currentContact, setCurrentContact] = useState<IContact>(null)

    const { friends } = useRoster(conn)
    const { chatMessage } = useMessage(conn)
    const { chatUnread } = useUnread(conn)
    useEffect(() => {
        const data = friends.map(chatId => {
            const msgArr = chatMessage[chatId]
            const c: IContact = { name: chatId }
            if (msgArr) {
                const latestMsg = msgArr[msgArr.length - 1]
                c.latestMessage = latestMsg.body.type === 'txt' ? latestMsg.body.msg : '[media]';
                c.unread = latestMsg.isUnread
                c.latestTime = new Date(latestMsg.time).toLocaleDateString()
            }
            return c
        })
        setContacts(data)

    }, [friends, chatUnread, setContacts])

    useEffect(() => {




    }, [conn])
    // let history: any = window.history;

    return { friends, chatMessage, currentContact, setCurrentContact, contacts }

}