/* eslint-disable */
//import "script-loader!easemob-websdk/dist/strophe-1.2.8.js"
/* eslint-enable */
import websdk from 'easemob-websdk'
import { defaultConfig, IConfig } from './config'
import emoji from './emoji'
import { IWebIM } from "./types";


export default (userConfig: IConfig = {}): IWebIM => {
    let config = { ...userConfig, ...defaultConfig }
    // init DOMParser / document for strophe and sdk
    let WebIM: IWebIM = (window as any).WebIM || {}

    WebIM.config = config


    WebIM.conn = new websdk.connection({
        isHttpDNS: config.isHttpDNS,
        isMultiLoginSessions: config.isMultiLoginSessions,
        https: config.https,
        url: config.xmppURL,
        isAutoLogin: false,
        heartBeatWait: config.heartBeatWait,
        autoReconnectNumMax: config.autoReconnectNumMax,
        autoReconnectInterval: config.autoReconnectInterval,
        isStropheLog: config.isStropheLog,
        delivery: config.delivery,
        appKey: config.appkey
    })

    // for downward compatibility
    if (!WebIM.conn.apiUrl) {
        WebIM.conn.apiUrl = config.apiURL
    }

    websdk.debug(true)

    WebIM.emoji = emoji
    return WebIM
}
