
// import {  StompService } from "@lianmed/utils";

import { useInit } from "./useInit";
// import { useRoster } from "./useRoster";
import { useUnread } from "./useUnread";
import { useMessage } from "./useMessage";
import { useContact } from "./useContact";
// import { useCurrent } from "./useCurrent";
// export { sendTxtMessage } from '../../utils/msgTool'
export function useI() {
    // const { conn } = useInit()

    // const { friends } = useRoster(conn)
    // const { chatMessage } = useMessage(conn)
    const { stompService } = useInit()
    const s = stompService.current
    const { chatUnread } = useUnread()
    const { chatMessage } = useMessage(s, chatUnread)
    const { contacts } = useContact(chatMessage, chatUnread)
    // const { currentMessage, setCurrent, current } = useCurrent(chatMessage)


    return { chatMessage, contacts }
}




