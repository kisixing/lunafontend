
import { useEffect, useState } from "react";

import { MessageMap, Contact, MessageType } from "./types";


export function useContact(chatMessage: MessageMap, chatUnread: MessageMap) {
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        const data = Object.keys(chatMessage).map(chatId => {
            const msgArr = chatMessage[chatId]
            const unreadArr = chatUnread[chatId] || []
            const c: Contact = { name: chatId }
            if (msgArr) {
                const latestMsg = msgArr[msgArr.length - 1]
                c.latestMessage = latestMsg.type === MessageType.text ? latestMsg.msg : '[media]';
                c.unread = unreadArr.length
                c.latestTime = new Date(latestMsg.timestamp).toLocaleDateString()
            }
            return c
        })
        setContacts(data)

    }, [setContacts, chatMessage])


    // let history: any = window.history;

    return { contacts }

}