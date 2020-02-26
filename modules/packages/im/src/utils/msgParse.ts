import {  TAnyMsgType, IMessage } from "../types/msg";
import {  msgClone } from "./msgTool";



export const parseFromServer = (message: TAnyMsgType): IMessage => {

    let obj: IMessage = msgClone(message)
    // all of entities of message should in body, not in base
    // body.ext could save any customize info of message, like image size, width, height etc
   return obj
}


export function parse(message: TAnyMsgType, username: string) {
    const m = parseFromServer(message)
    const { to, status } = m
    let { type } = m
    // where the message comes from, when from current user, it is null
    const from = m.from || username
    // bySelf is true when sent by current user, otherwise is false
    const bySelf = from == username
    // root id: when sent by current user or in group chat, is id of receiver. Otherwise is id of sender
    let chatId = bySelf || type !== 'chat' ? to : from
    // chatId = type === "stranger" ? from
    if (type === 'stranger') {
        chatId = from
    }

    // change type as stranger
    // if (type === "chat" && !rootState.entities.roster.byName[chatId]) {
    //     type = "stranger";
    //     message.type = "stranger";
    // }

    // update message array
    const _message: IMessage = {
        ...m,
        bySelf,
        time: +new Date(),
        status,
        chatId
    }
    return _message
}