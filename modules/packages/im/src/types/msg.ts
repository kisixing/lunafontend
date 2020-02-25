type TMsgType = 'chat' | 'groupchat' | 'chatroom' | 'stranger'
export enum EMsgBodyType {
    txt = 'txt',
    img = 'img',
    file = 'file',
    video = 'video',
    audio = 'audio'
}
export interface IRawMsg {
    id: string
    type: TMsgType | string
    from: string
    to: string
    ext?: {
        [x: string]: any
        file_length: { low: number, high: number, unsigned: number }
    }
    error: boolean
    errorText: string
    errorCode: number
    msgConfig: any
    time: string
    status?: any
}
export type TAnyMsgType = IPresenceMsg | IFileMsg | IAudioMsg | ITextMsg | IMutedMsg | IPictureMsg | IInviteMsg | IVideoMsg
export interface IPresenceMsg extends IRawMsg {
    bodyType: void
    type: 'joinGroupNotifications' | 'deleteGroupChat' | 'leaveGroup' | 'removedFromGroup' | 'invite' | 'direct_joined' | 'joinPublicGroupSuccess' | 'joinPublicGroupDeclined' | 'joinChatRoomSuccess' | 'reachChatRoomCapacity' | 'subscribe' | 'subscribed' | 'unsubscribe' | 'unsubscribed' | 'memberJoinPublicGroupSuccess' | 'memberJoinChatRoomSuccess' | 'leaveChatRoom' | 'addMute' | 'removeMute' | 'addAdmin' | 'removeAdmin' | 'changeOwner';
    gid?: any;
    kicked?: any;
    owner?: any;
}

export interface IPictureMsg extends IRawMsg {
    bodyType: EMsgBodyType.img
    thumb: string
    thumb_secret: string
    width: number
    height: number
    filetype: string
    url: string
    secret: string
    filename: string
    file_length: string
    accessToken: string
}
export interface IFileMsg extends IRawMsg {
    bodyType: EMsgBodyType.file
    url: string
    secret: string
    filename: string
    file_length: number
    accessToken: string
}
export interface IAudioMsg extends IRawMsg {
    bodyType: EMsgBodyType.audio
}
export interface IVideoMsg extends IRawMsg {
    bodyType: EMsgBodyType.video
}
export interface IInviteMsg extends IRawMsg {
    bodyType: void

}
export interface IMutedMsg extends IRawMsg {
    bodyType: void
    mid?: any;
}

export interface ITextMsg extends IRawMsg {
    bodyType: EMsgBodyType.txt
    data: string
    sourceMsg: string
}

export interface IMessageBody {
    type: EMsgBodyType,
    msg?: string
    file_length?: number,
    filename?: string,
    filetype?: string,
    length?: number,
    secret?: string,
    width?: number,
    height?: number,
    url?: string,
    thumb?: string,
    thumb_secret?: string
}

export interface IMessage {
    error: boolean
    errorCode: string
    errorText: string
    id: string
    from: string
    to: string
    toJid: string
    body: IMessageBody
    type: TMsgType
    ext: {}
    isUnread: number
    bySelf: boolean
    status: string
    time: number
    chatId: string
}