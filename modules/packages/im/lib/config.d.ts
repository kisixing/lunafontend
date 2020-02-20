export interface IConfig {
    heartBeatWait?: Number;
    xmppURL?: String;
    apiURL?: String;
    appkey?: String;
    Host?: String;
    https?: Boolean;
    isHttpDNS?: Boolean;
    isMultiLoginSessions?: Boolean;
    isWindowSDK?: Boolean;
    isSandBox?: Boolean;
    isDebug?: Boolean;
    isStropheLog?: Boolean;
    autoReconnectNumMax?: Number;
    autoReconnectInterval?: Number;
    isWebRTC?: Boolean;
    i18n?: String;
    isAutoLogin?: Boolean;
    p2pMessageCacheSize?: Number;
    delivery?: Boolean;
    groupMessageCacheSize?: Number;
    loglevel?: String;
    enableLocalStorage?: Boolean;
}
export declare const defaultConfig: IConfig;
