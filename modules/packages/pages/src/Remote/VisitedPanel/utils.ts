import request from "@lianmed/request";
import { IVisit } from "."

export const isElectron = navigator.userAgent.includes('electron') || navigator.userAgent.includes('Electron')

export const onOpen = (
    () => {
        const wins: { [x: string]: Window } = {}
        return ({ url, name, ...o }: IVisit) => {
            if (isElectron) {
                const electron = window.require('electron')
                electron.ipcRenderer.send('open', { ...o, url, name })
            } else {
                const old = wins[name]
                old && old.close()
                const target = wins[name] = window.open(url)
                console.log('e', wins[name])

                target.addEventListener('load', e => {
                    setTimeout(() => {
                        target.postMessage(JSON.stringify({
                            type: 'config',
                            data: request.configure
                        }), url)
                    }, 10000)
                })

            }
        }
    }
)()