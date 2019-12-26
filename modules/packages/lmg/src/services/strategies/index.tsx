import { push_devices } from "./push_devices";
import { getVolume } from "./getVolume";
import { WsService } from "../WsService";
export const strategies: { [x: string]: Function } = {
    push_devices,
    getVolume
}

export function getStrategies(context: WsService): { [x: string]: Function } {
    const entries = Object.entries(strategies)
    return entries.reduce((r, [k, v]) => {
        r[k] = v.bind(context)
        return r
    }, {})
}