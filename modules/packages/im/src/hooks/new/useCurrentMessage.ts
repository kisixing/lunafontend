
import { useEffect, useState } from "react";

import { IMessageMap, IMessage, IContact } from "./types";


export function useCurrentMessage(chatMessage: IMessageMap, current: IContact) {
    const [currentMessage, setCurrentMessage] = useState<IMessage[]>([])
    useEffect(() => {
        if (current) {
            let mesgArr = chatMessage[current.name] || []
        

            setCurrentMessage(mesgArr)
        }

    }, [chatMessage, current])



    return { currentMessage }

}