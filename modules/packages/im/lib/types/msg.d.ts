declare type TMsgType = 'chat' | 'groupchat' | 'chatroom';
export declare enum EMsgBodyType {
    txt = 0,
    img = 1,
    file = 2,
    video = 3,
    audio = 4
}
export interface IMsg {
    id: string;
    type: TMsgType | string;
    from: string;
    to: string;
    ext?: {
        [x: string]: any;
        file_length: {
            low: number;
            high: number;
            unsigned: number;
        };
    };
    error: boolean;
    errorText: string;
    errorCode: number;
    msgConfig: any;
    time: string;
    status?: any;
}
export declare type TAnyMsgType = IPresenceMsg | IFileMsg | IAudioMsg | ITextMsg | IMutedMsg | IPictureMsg | IInviteMsg | IVideoMsg;
export interface IPresenceMsg extends IMsg {
    bodyType: void;
    type: 'joinGroupNotifications' | 'deleteGroupChat' | 'leaveGroup' | 'removedFromGroup' | 'invite' | 'direct_joined' | 'joinPublicGroupSuccess' | 'joinPublicGroupDeclined' | 'joinChatRoomSuccess' | 'reachChatRoomCapacity' | 'subscribe' | 'subscribed' | 'unsubscribe' | 'unsubscribed' | 'memberJoinPublicGroupSuccess' | 'memberJoinChatRoomSuccess' | 'leaveChatRoom' | 'addMute' | 'removeMute' | 'addAdmin' | 'removeAdmin' | 'changeOwner';
    gid?: any;
    kicked?: any;
    owner?: any;
}
export interface IPictureMsg extends IMsg {
    bodyType: EMsgBodyType.img;
    url: string;
    secret: string;
    filename: string;
    thumb: string;
    thumb_secret: string;
    file_length: string;
    width: number;
    height: number;
    filetype: string;
    accessToken: string;
}
export interface IFileMsg extends IMsg {
    bodyType: EMsgBodyType.file;
    url: "http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/aea92a50-56db-11ea-b17b-7334681c33ae";
    secret: "rql4cFbbEeqVORfy6HL0wIPRQ1sG5y3HH-Vm7cdD-sAyxdOV";
    filename: "uninstall.exe";
    file_length: 420297;
    accessToken: "YWMtMMREGlamEeqiPUHSYOhM6k1-S6DcShHjkNXh_7qs2vVDfE3gU7QR6pIahZ2qs3x0AwMAAAFwdNdhJwBPGgArPE_4zppzsOyeiU7joQ6FqwJmcSg4RbMtiGGWkvqGxg";
}
export interface IAudioMsg extends IMsg {
    bodyType: EMsgBodyType.audio;
}
export interface IVideoMsg extends IMsg {
    bodyType: EMsgBodyType.video;
}
export interface IInviteMsg extends IMsg {
    bodyType: void;
}
export interface IMutedMsg extends IMsg {
    bodyType: void;
    mid?: any;
}
export interface ITextMsg extends IMsg {
    bodyType: EMsgBodyType.txt;
    data: string;
    sourceMsg: string;
}
export {};
