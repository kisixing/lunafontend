import { IAudioMsg, IPresenceMsg, IPictureMsg, IInviteMsg, IMutedMsg, ITextMsg, IFileMsg, IVideoMsg } from "./msg";
export interface ICbs {
    onOpened?: (msg: any) => void;
    onPresence?: (msg: IPresenceMsg) => void;
    onError?: (err: any) => void;
    onClosed?: (msg: any) => void;
    onBlacklistUpdate?: (list: any) => void;
    onReadMessage?: (msg: any) => void;
    onDeliveredMessage?: (msg: any) => void;
    onReceivedMessage?: (msg: {
        id: any;
        mid: any;
    }) => void;
    onRecallMessage?: (msg: any) => void;
    onLocationMessage?: (msg: any) => void;
    onTextMessage?: (msg: ITextMsg) => void;
    onPictureMessage?: (msg: IPictureMsg) => void;
    onFileMessage?: (msg: IFileMsg) => void;
    onAudioMessage?: (msg: IAudioMsg) => void;
    onVideoMessage?: (msg: IVideoMsg) => void;
    onInviteMessage?: (msg: IInviteMsg) => void;
    onMutedMessage?: (msg: IMutedMsg) => void;
}
export declare type TListen = (cbs: ICbs) => void;
