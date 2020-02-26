import { EMsgBodyType, IMessage, TRawMsgType, PartialRawMsg, TAnyMsgType } from "../types/msg";
import { IWebIM } from "../types";

const baseTpl: IMessage = {
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
    time: null,
    type: null, // chat / groupchat
    body: { type: null },
    ext: {},
    bySelf: false,
    isUnread: 1,
    chatId: null
}

export const msgTpl = {
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


baseTpl
function copy(source: object, target: object) {
    const obj = {}
    Object.keys(target).forEach(v => {
        obj[v] = source[v] || target[v]
    })
    return obj as IMessage
}
export function msgCopy(message: PartialRawMsg, tplKey: keyof typeof msgTpl) {
    const tpl = msgTpl[tplKey]
    const obj = {}
    Object.keys(tpl).forEach(v => {
        obj[v] = message[v] || tpl[v]
    })
    return obj as any
}
export function msgClone(message: TAnyMsgType) {
    const bodyType = message.bodyType
    let ext = message.ext || {}
    const base = copy(message, baseTpl)
    const body = copy(message, msgTpl[bodyType])

    const data: IMessage = {
        ...base,
        body: {
            ...body,
            ...ext,
            type: bodyType
        }
    }
    if (message.bodyType === EMsgBodyType.txt) {
        data.body.msg = message.data
    }
    return data
}
export function parseFromLocal(message: TAnyMsgType) {
    const data = msgClone(message)
    const { to } = data
    return {
        chatId: to,
        ...data
    } as IMessage
}

export const sendTxtMessage = (_to: string, chatType: TRawMsgType, data: string) => {
    // console.log('sendTxtMessage', chatType, chatId, message)
    return new Promise((res, rej) => {
        const webIM = (window as any).WebIM as IWebIM
        const { conn} = webIM
        if (!conn) {
            rej(null)
        }
        // const pMessage = parseFromLocal(conn.getUniqueId(), chatType, _to, m, EMsgBodyType.txt)
        const pMessage = parseFromLocal({
            id: conn.getUniqueId().toString(),
            bodyType: EMsgBodyType.txt,
            type: chatType,
            data,
            to: _to,
            from: conn.user
        })
        const { body, id, to } = pMessage
        const { type, msg } = body
        const msgObj = webIM.message(type, +id)
        const chatroom = chatType === 'chatroom'
        // console.log(pMessage)
        msgObj.set({
            //TODO: cate type == 'chatrooms'
            msg,
            to,
            roomType: chatroom,
            chatType: 'singleChat',
            success: function () {
                pMessage.status = 'sent'
                res(pMessage)
            },
            fail: function () {
                pMessage.status = 'fail'
                rej(pMessage)
            }
        })

        if (chatType == 'groupchat' || chatType == 'chatroom') {
            msgObj.setGroup('groupchat')
        }
        conn.send(msgObj.body)
    })
}