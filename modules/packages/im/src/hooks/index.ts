
import { useEffect, useState } from "react";
import { IContact } from "../types";
import { useInit } from "./useInit";
import { useRoster } from "./useRoster";
import { useUnread } from "./useUnread";
import { useMessage } from "./useMessage";

interface IMsg {

}

export default () => {
    const { isOpen, conn, imDb } = useInit()
    const [msg, setMsg] = useState<{ [x: string]: IMsg[] }>({})
    const [contacts, setContacts] = useState<IContact[]>([])
    const [currentContact, setCurrentContact] = useState<IContact>(null)
    const { friends } = useRoster(isOpen, conn)
    const { chatUnread } = useUnread(isOpen, conn, imDb)
    useEffect(() => {
        const data = friends.map(f => {
            const allMsg = msg[f]
            if (allMsg) {
                const latestMsg = allMsg[f]
                latestMsg
            }
        })
    }, [friends, chatUnread])

    useEffect(() => {




    }, [isOpen, conn])
    // let history: any = window.history;

    return [friends]

}