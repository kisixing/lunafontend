import { EMsgBodyType, TAnyMsgType, IMsg } from "../types/msg";
const msgTpl = {
    base: {
        error: false,
        errorCode: '',
        errorText: '',
        // if status is blank, it's treated as "sent" from server side
        status: 'sending', // [sending, sent ,fail, read]
        id: '',
        // from - room id need it,should not be deleted
        from: '',
        to: '',
        toJid: '',
        time: '',
        type: '', // chat / groupchat
        body: {},
        ext: {},
        bySelf: false
    },
    [EMsgBodyType.txt]: {
        type: EMsgBodyType.txt,
        msg: ''
    },
    [EMsgBodyType.img]: {
        type: EMsgBodyType.img,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    [EMsgBodyType.file]: {
        type: EMsgBodyType.file,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    [EMsgBodyType.video]: {
        type: EMsgBodyType.video,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    [EMsgBodyType.audio]: {
        type: EMsgBodyType.audio,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    }
}
interface IObj extends IMsg {

}
function copy(message, tpl) {
    let obj = {}
    Object.keys(tpl).forEach(v => {
        obj[v] = message[v] || tpl[v]
    })
    return obj as IObj
}


export const parseFromServer = (message: TAnyMsgType) => {


    let ext = message.ext || {}
    let obj = copy(message, msgTpl.base)
    // all of entities of message should in body, not in base
    // body.ext could save any customize info of message, like image size, width, height etc
    let body = copy(message, msgTpl[message.bodyType as EMsgBodyType])
    switch (message.bodyType) {
        case EMsgBodyType.txt:
            return {
                ...obj,
                status: 'sent',
                body: {
                    ...body,
                    ...ext,
                    msg: message.data,
                    type: EMsgBodyType.txt
                }
            }
        case EMsgBodyType.img:
            return {
                ...obj,
                status: 'sent',
                body: {
                    ...body,
                    ...ext,
                    type: EMsgBodyType.img
                }
            }
        case EMsgBodyType.file:
            return {
                ...obj,
                status: 'sent',
                body: {
                    ...body,
                    ...ext,
                    type: EMsgBodyType.file
                }
            }
        case EMsgBodyType.audio:
            return {
                ...obj,
                status: 'sent',
                body: {
                    ...body,
                    ...ext,
                    type: EMsgBodyType.audio
                }
            }
        case EMsgBodyType.video:
            return {
                ...obj,
                status: 'sent',
                body: {
                    ...body,
                    ...ext,
                    type: EMsgBodyType.video
                }
            }
    }
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
    const _message = {
        ...m,
        bySelf,
        time: +new Date(),
        status: status,
        chatId
    }
    return _message
}