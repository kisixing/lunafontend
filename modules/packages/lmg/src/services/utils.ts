import { BedStatus, ICacheItem, ICache } from './types'
import Queue from "../Ecg/Queue";

export function getEmptyCacheItem(base = null): ICacheItem {
    return Object.assign({
        fhr: [],
        toco: [],
        fm: [],
        index: 0,
        length: 0,
        start: -1,
        last: 0,
        past: 0,
        timestamp: 0,
        docid: '',
        status: BedStatus.Offline,
        orflag: true,
        starttime: '',
        pregnancy: null,
        fetal_num: 1,
        csspan: NaN,
        ismulti: false,
        ecg: new Queue(),
        ecgdata: [],
    }, base)
}

export function cleardata(datacache: ICache, curid: string, fetal_num: number) {
    const target = datacache.get(curid)
    const empty = getEmptyCacheItem({ fetal_num, fhr: Array(fetal_num).fill([]) })
    if (target) {
        Object.assign(target, empty)
    } else {
        datacache.set(curid, empty);
    }
}