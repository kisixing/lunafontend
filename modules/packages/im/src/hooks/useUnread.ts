import { useEffect, useState } from "react";
import { IConn } from "../types/conn";
import { ImDb } from "../utils/ImDb";
import { IMessage } from "../types/msg";



export const useUnread = (isOpen: boolean, conn: IConn, imDb: ImDb) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }


    const [chatUnread, setChatUnread] = useState<{ [x: string]: IMessage }>({})
    useEffect(() => {
        if (isOpen) {

            const b: string[] = conn.getBlacklist()

            imDb.getUnreadList().then((res: IMessage[]) => {
                console.log('unread', res)

                const _chatUnread = {}
                res
                    .filter(r => !r.error)
                    .forEach(r => {
                        switch (r.type) {
                            case 'chat':
                                _chatUnread[r.chatId] = r
                                break
                        }
                    })
                setChatUnread(_chatUnread)

            })
        }
    }, [isOpen, conn])
    // let history: any = window.history;

    return { chatUnread }

}