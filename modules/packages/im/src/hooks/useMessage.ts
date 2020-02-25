import { useEffect, useState } from "react";
import { IConn } from "../types/conn";
import { imDb } from "../utils/ImDb";
import { IMessage } from "../types/msg";
import { EEvents } from "../types";

export interface IMessageMap {
    [x: string]: IMessage[]
}

export const useMessage = ( conn: IConn) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }
    const [chatMessage, setChatMessage] = useState<IMessageMap>({})

    useEffect(() => {
        const cb = (mes: IMessage) => {
            const { type, chatId } = mes
            if (type === 'chat') {
                const oldArr = chatMessage[chatId] || []
                const newArr = [...oldArr, mes]
                setChatMessage({ ...chatMessage, [chatId]: newArr })
                imDb.addMessage(mes, 1)
            }
        }
         conn && conn.on(EEvents.chatMessage, cb)
        return () => {
             conn && conn.off(EEvents.chatMessage, cb)
        }
    }, [conn])

    return { chatMessage }

}