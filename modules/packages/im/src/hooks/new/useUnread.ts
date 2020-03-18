import { useEffect, useState } from "react";

import { MessageMap } from "./types";
import {  post } from "@lianmed/request";


export const useUnread = () => {
    // let collection = {
    //     'chat': {},
    //     'chatroom': {},
    //     'groupchat': {},
    //     'stranger': {}
    // }


    const [chatUnread, setChatUnread] = useState<MessageMap>({})
    useEffect(() => {
        setChatUnread({})
        console.log('ppppp', '离线')

        post('/pullUnreadMessage').then(r => {
            console.log('ppppp', r)
        })
    }, [])
    // let history: any = window.history;

    return { chatUnread }

}