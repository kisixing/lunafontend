
// import {  StompService } from "@lianmed/utils";

import { useInit } from "./useInit";
// import { useRoster } from "./useRoster";
import { useUnread } from "./useUnread";
import { useMessage } from "./useMessage";
import { useContact } from "./useContact";
import { useCurrent } from "./useCurrent";
import { useCallback } from "react";
import { IMessage, MessageType } from "./types";
// export { sendTxtMessage } from '../../utils/msgTool'
export function useI() {
    // const { conn } = useInit()

    // const { friends } = useRoster(conn)
    // const { chatMessage } = useMessage(conn)
    const { stompService } = useInit()
    const { chatUnread, setChatUnread } = useUnread()
    const { chatMessage } = useMessage(stompService, chatUnread, setChatUnread)
    const { contacts } = useContact(chatMessage)
    const { current, currentMessage, setCurrentId } = useCurrent(chatMessage, contacts)


    const sendTextMessage = useCallback(
        (receiver: string, msg: string) => {
            const msgData: IMessage = { type: MessageType.text, receiver, msg }
            stompService.send('/app/sendPrivateMessage', msgData)
        },
        [],
    )


    return { chatMessage, contacts, current, currentMessage, setCurrentId, sendTextMessage }
}




