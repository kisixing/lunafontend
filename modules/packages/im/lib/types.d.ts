import { IConfig } from "./config";
interface IPresenceMsg {
    type: 'joinGroupNotifications' | 'deleteGroupChat' | 'leaveGroup' | 'removedFromGroup' | 'invite' | 'direct_joined' | 'joinPublicGroupSuccess' | 'joinPublicGroupDeclined' | 'joinChatRoomSuccess' | 'reachChatRoomCapacity' | 'subscribe' | 'subscribed' | 'unsubscribe' | 'unsubscribed' | 'memberJoinPublicGroupSuccess' | 'memberJoinChatRoomSuccess' | 'leaveChatRoom' | 'addMute' | 'removeMute' | 'addAdmin' | 'removeAdmin' | 'changeOwner';
    gid?: any;
    kicked?: any;
    owner?: any;
    from?: any;
}
interface IPictureMsg {
    type: 'chat' | 'groupchat' | 'chatroom';
    from?: any;
    to?: any;
}
interface IFileMsg {
    type: 'chat' | 'groupchat' | 'chatroom';
    from?: any;
    to?: any;
}
interface IAudioMsg {
    type: 'chat' | 'groupchat' | 'chatroom';
    from?: any;
    to?: any;
}
interface IInviteMsg {
    from?: any;
    roomid?: any;
}
interface IMutedMsg {
    mid?: any;
}
interface ITextMsg {
    from?: string;
    to?: string;
    type?: 'chat' | 'groupchat' | 'chatroom' | 'stranger';
    ext?: {
        msg_extension?: any;
        conferenceId?: any;
        password?: any;
    };
    id: string;
    data: string;
    sourceMsg: string;
    time: string;
    msgConfig: null;
    error: boolean;
    errorText: string;
    errorCode: number;
    message_type: string;
}
interface ICbs {
    onOpened: (msg: any) => void;
    onPresence: (msg: IPresenceMsg) => void;
    onError: (err: any) => void;
    onClosed: (msg: any) => void;
    onBlacklistUpdate: (list: any) => void;
    onReadMessage: (msg: any) => void;
    onDeliveredMessage: (msg: any) => void;
    onReceivedMessage: (msg: {
        id: any;
        mid: any;
    }) => void;
    onRecallMessage: (msg: any) => void;
    onLocationMessage: (msg: any) => void;
    onTextMessage: (msg: ITextMsg) => void;
    onPictureMessage: (msg: IPictureMsg) => void;
    onFileMessage: (msg: IFileMsg) => void;
    onAudioMessage: (msg: IAudioMsg) => void;
    onVideoMessage: (msg: any) => void;
    onInviteMessage: (msg: IInviteMsg) => void;
    onMutedMessage: (msg: IMutedMsg) => void;
}
export interface IWebIM {
    config: IConfig;
    conn: {
        autoReconnectNumTotal: any;
        autoReconnectNumMax: any;
        apiUrl: string;
        listen: (cbs: ICbs) => void;
        subscribe: (data: {
            to: any;
            message: any;
        }) => void;
        getRoster: (data: {
            success: (roster: {
                name: string;
                subscription: string;
                jid: {
                    appKey: string;
                    name: string;
                    domain: string;
                    clientResource: string;
                };
            }[]) => void;
            error: (error: any) => void;
        }) => void;
        open: (data: {
            apiUrl: string;
            user: string;
            pwd?: string;
            accessToken?: string;
            appKey: string;
            success: (token: {
                access_token: string;
                expires_in: number;
                user: {
                    uuid: string;
                    type: string;
                    created: number;
                    modified: number;
                    username: string;
                    activated: Boolean;
                };
            }) => void;
            error: (e: any) => void;
        }) => void;
    };
    emoji: {
        [x: string]: string;
    };
    statusCode: {
        WEBIM_CONNCTION_DISCONNECTED: any;
        WEBIM_CONNCTION_AUTH_ERROR: any;
        WEBIM_CONNCTION_SERVER_CLOSE_ERROR: any;
        WEBIM_CONNCTION_SERVER_ERROR: any;
        WEBIM_CONNCTION_USER_REMOVED: any;
        WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE: any;
        WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD: any;
        WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE: any;
    };
    call?: {
        listener?: {
            onInvite?: any;
        };
    };
}
export {};
