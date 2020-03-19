
import { useEffect, useState, useCallback } from "react";

import { IMessageMap, IMessage, IContact } from "./types";


export function useCurrent(chatMessage: IMessageMap, contacts: IContact[]) {
    const [current, setCurrent] = useState<IContact>(null)
    const [currentMessage, setCurrentMessage] = useState<IMessage[]>([])
    useEffect(() => {
        if (current) {
            let mesgArr = chatMessage[current.name] || []

            mesgArr = mesgArr.sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp))
                .reduce((res, _) => {
                    const preIndex = (res.length - 1) < 0 ? 0 : (res.length - 1)
                    const pre = res[preIndex] || { timestamp: new Date().toUTCString() }
                    const isHead = (+new Date(_.timestamp) - +new Date(pre.timestamp)) > 1000 * 10
                    _.isHead = isHead
                    return res.concat(_)
                }, [] as IMessage[])

            setCurrentMessage(mesgArr)
        }

    }, [chatMessage, current])

    const setCurrentId = useCallback(
        (id: string) => {
            const target = contacts.find(_ => _.name === id)
            setCurrent(target)
        },
        [contacts]
    )
    // let history: any = window.history;

    return { currentMessage, setCurrentId, current }

}