
import { useEffect, useState } from "react";

import { MessageMap, Message } from "./types";


export function useCurrent(chatMessage: MessageMap) {
    const [current, setCurrent] = useState<string>(null)
    const [currentMessage, setCurrentMessage] = useState<Message[]>([])
    useEffect(() => {
        console.log('current change', current, currentMessage)
        const mesgArr = chatMessage[current] || []
        setCurrentMessage([...currentMessage, ...mesgArr])

    }, [chatMessage, current, setCurrentMessage])


    // let history: any = window.history;

    return { currentMessage, setCurrent, current }

}