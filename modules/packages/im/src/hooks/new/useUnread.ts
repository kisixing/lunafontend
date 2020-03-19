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
                    sender: 'zz',
                    timestamp: '2019-01-01',
                    msg: 'www',
                    type: MessageType.text
                },
                {
                    id: 2,
                    receiver: 'admin',
                    sender: 'ff',
                    timestamp: '2019-01-01',
                    msg: 'w d我第三方为夫士大夫；理解为人',
                    type: MessageType.text
                },
                {
                    id: 2,
                    receiver: 'admin',
                    sender: 'qq',
                    timestamp: '2019-01-01',
                    msg: 'www',
                    type: MessageType.text
                },
            ]
            const data = result
                .map(_ => ({ ..._, unread: true }))
                .reduce((res, a) => {
                    const sender = a.sender
                    const old = res[sender] || []
                    old.push(a)
                    return Object.assign(res, { [sender]: old })
                }, {})
            setChatUnread(data)
        })
    }, [])
    // let history: any = window.history;

    return { chatUnread, setChatUnread }

}