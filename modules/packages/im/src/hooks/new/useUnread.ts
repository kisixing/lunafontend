import { useEffect, useState } from "react";

import { IMessageMap, IMessage, MessageType } from "./types";
import { post } from "@lianmed/request";


export const useUnread = () => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }


    const [chatUnread, setChatUnread] = useState<IMessageMap>({})
    useEffect(() => {

        post('/pullUnreadMessage').then((r: {
            result: IMessage[]
        }) => {
            const result = r.result || [
                {
                    id: 2,
                    receiver: 'admin',
                    sender: 'admin',
                    timestamp: '2019-01-01',
                    msg: '你好:D',
                    type: MessageType.text
                },
                {
                    id: 3,
                    receiver: 'admin',
                    sender: 'admin',
                    timestamp: '2019-01-01',
                    msg: '你好:D',
                    type: MessageType.text,
                    bySelf: true
                },
            ]
            const data = result
                .map(_ => ({ ..._, unread: true }))
                .reduce((res, a) => {
                    const sender = a.sender
                    // const receiver = a.receiver
                    const old = res[sender] || []
                    old.push({ ...a })
                    return Object.assign(res, { [sender]: old })
                }, {} as IMessageMap)
            setChatUnread(data)
        })
    }, [])
    // let history: any = window.history;

    return { chatUnread, setChatUnread }

}