export interface IConfig {
    heartBeatWait?: number;
    xmppURL?: string;
    apiURL?: string;
    appkey?: string;
    Host?: string;
    https?: Boolean;
    isHttpDNS?: Boolean;
    isMultiLoginSessions?: Boolean;
    isWindowSDK?: Boolean;
    isSandBox?: Boolean;
    isDebug?: Boolean;
    isStropheLog?: Boolean;
    autoReconnectNumMax?: number;
    autoReconnectInterval?: number;
    isWebRTC?: Boolean;
    i18n?: string;
    isAutoLogin?: Boolean;
    p2pMessageCacheSize?: number;
    delivery?: Boolean;
    groupMessageCacheSize?: number;
    loglevel?: string;
    enableLocalStorage?: Boolean;
}
export declare const defaultConfig: IConfig;
