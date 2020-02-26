import { useEffect, useState } from "react";
import { IConn } from "../types/conn";
import { imDb } from "../utils/ImDb";
import { IMessage } from "../types/msg";
import { IMessageMap } from "./useMessage";



export const useUnread = (conn: IConn) => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }


    const [chatUnread, setChatUnread] = useState<IMessageMap>({})
    useEffect(() => {
        if (conn) {

            // const b: string[] = conn.getBlacklist()

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
    }, [conn])
    // let history: any = window.history;

    return { chatUnread }

}