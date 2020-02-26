/* eslint-disable */
//import "script-loader!easemob-websdk/dist/strophe-1.2.8.js"
/* eslint-enable */
import websdk from 'easemob-websdk'
import { defaultConfig, IConfig } from '../utils/config'
import emoji from '../utils/emoji'
import { IWebIM } from "../types/index";
import { listenerIntercept } from "../utils/listenerIntercept";
interface IOpen extends IConfig {
    user?: string
    token?: string
}
export const open = (userConfig: IOpen): Promise<IWebIM> => {
    // init DOMParser / document for strophe and sdk
    let WebIM: IWebIM = (window as any).WebIM || ((window as any).WebIM = {})

    let config = { ...defaultConfig, ...userConfig, }

    WebIM.config = config
    const conn = WebIM.conn = new websdk.connection({
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
    if (!conn.apiUrl) {
        conn.apiUrl = config.apiURL
    }

    websdk.debug(true)

    WebIM.emoji = emoji
    return new Promise((res) => {
        const { user, token } = userConfig
        const data = {
            user,
            pwd: token,
            accessToken: token,
            apiUrl: config.apiURL,
            // success(token) {
            //     console.log(`login success`, token)
            //     sessionStorage.setItem(TOKEN_KEY, token)
            //     res(WebIM)
            // },
            // error(e) {
            //     console.log('webim error', e)
            // },
            appKey: config.appkey
        }

        conn.open(data)
        // const old = WebIM.conn.listen
        WebIM.conn = listenerIntercept(conn)
        res(WebIM)
    })
}
