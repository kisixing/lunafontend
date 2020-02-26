
import { useEffect, useState } from "react";
import { IContact } from "../types";

import { IMessageMap } from "./useMessage";


export function useContact(friends: string[], chatMessage: IMessageMap, chatUnread: IMessageMap) {
    const [contacts, setContacts] = useState<IContact[]>([])

    useEffect(() => {
        const data = friends.map(chatId => {
            const msgArr = chatMessage[chatId]
            const unreadArr = chatUnread[chatId] || []
            const c: IContact = { name: chatId }
            if (msgArr) {
                const latestMsg = msgArr[msgArr.length - 1]
                c.latestMessage = latestMsg.body.type === 'txt' ? latestMsg.body.msg : '[media]';
                c.unread = unreadArr.length
                c.latestTime = new Date(latestMsg.time).toLocaleDateString()
            }
            return c
        })
        setContacts(data)

    }, [friends, setContacts, chatMessage])


    // let history: any = window.history;

    return { contacts }

}