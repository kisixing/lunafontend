import { useEffect, useState } from "react";
import { IConn } from "../types/conn";
import { ImDb } from "../utils/ImDb";
import { IMessage } from "../types/msg";
import { EEvents } from "../types";

interface IMessageMap {
    [x: string]: IMessage[]
}

export const useMessage = (isOpen: boolean, conn: IConn, imDb: ImDb) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }
    const [chatMessage, setChatMessage] = useState<IMessageMap>({})

    useEffect(() => {
        conn.on(EEvents.chatMessage, (mes: IMessage) => {
            const { type, chatId } = mes
            if (type === 'chat') {
                const oldArr = chatMessage[chatId] || []
                const newArr = [...oldArr, mes]
                setChatMessage({ ...chatMessage, [chatId]: newArr })
                imDb.addMessage(mes, 1)
            }
        })

    }, [isOpen, conn])

    return { chatMessage }

}