import request from "@lianmed/request";
import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { useStomp } from "./useStomp";
import { isElectron } from "./utils";
export interface IVisit { title: string, iconUrl: string, url: string, name: string, reload: boolean }
export type VisitedData = IVisit[]
interface IDataItem {
    url: string,
    name: string,
    reload?: boolean
}
const _data: IDataItem[] = [
    {
        url: '/remote/index.html',
        name: 'remote',
        reload: true
    },
    // {
    //     url: '/im/index.html',
    //     name: 'im'
    // },

]


interface IProps {
    remote_url?: string
    public_url?: string
    data?: IDataItem[]
}
const electron = (isElectron && window.require('electron')) || {}
const { ipcRenderer, remote } = electron
export default (props: IProps) => {
    const _url = `${location.protocol}//${location.host}`
    const { remote_url = _url, public_url = `${remote_url}/obvue`, data = _data } = props
    const [visitedData, setVisitedData] = useState<VisitedData>([])
    useStomp(visitedData, remote_url)

    useEffect(() => {
        const fn = e => {
            setTimeout(() => {
                const r = remote && remote.getGlobal('windows').remote
                r && r.send('message', { data: { ...request.configure, prefix: `/api` } })
                console.log('mess',r)
            }, 10000)
        }
        ipcRenderer && ipcRenderer.on('load', fn)

        return () => {
            isElectron && ipcRenderer.removeListener('load', fn)
        }
    }, [])

    useEffect(() => {
        Promise.all<IVisit>(
            data.map(_ => {
                let url = _.url
                const isAbs = url.startsWith('http')
                const absUrl = isAbs ? url : `${public_url.includes('://') ? '' : 'http://'}${public_url}${url}`
                if (!isAbs) {
                    url = request.configToLocation(absUrl, { prefix: `${remote_url}/api` })
                }
                return request.get('', { prefix: absUrl, hideErr: true, headers: { Origin: url, Accept: 'text/html' } }).then(raw => {
                    if (raw) {
                        let iconUrl = ''
                        const origin = new URL(absUrl).origin
                        const el = document.createElement('html')
                        el.innerHTML = raw
                        const l: HTMLLinkElement = el.querySelector('link[rel*=icon]')
                        if (l) {
                            let href = l.getAttribute('href')
                            if (href.includes('//')) {
                                iconUrl = href
                            } else {
                                iconUrl = `${origin}${l.getAttribute('href')}`
                            }
                        }
                        const t: HTMLTitleElement = el.querySelector('title')
                        const title = t && t.innerText
                        return ({
                            ..._, url, title, iconUrl
                        })
                    } else {
                        return _
                    }
                }).catch(() => null)
            })
        ).then(d => {
            setVisitedData(d.filter(_ => !!_))
        })


    }, [data])
    return (
        <Panel visitedData={visitedData} />
    )
}