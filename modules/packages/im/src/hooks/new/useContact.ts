
import { useEffect, useState } from "react";

import { IMessageMap, IContact, MessageType } from "./types";


export function useContact(chatMessage: IMessageMap) {
    const [contacts, setContacts] = useState<IContact[]>([])

    useEffect(() => {
        const data = Object.keys(chatMessage).map(chatId => {
            const msgArr = chatMessage[chatId]
            const c: IContact = { name: chatId }
            if (msgArr.length) {
                const latestMsg = msgArr[msgArr.length - 1]
                c.latestMessage = latestMsg.type === MessageType.text ? latestMsg.msg : '[media]';
                c.unread = msgArr.filter(_ => _.unread).length
                c.latestTime = new Date(latestMsg.timestamp).toLocaleDateString()
            }
            return c
        })
        setContacts(data)
        console.log('ssss________', chatMessage)
    }, [setContacts, chatMessage])


    // let history: any = window.history;

    return { contacts }

}