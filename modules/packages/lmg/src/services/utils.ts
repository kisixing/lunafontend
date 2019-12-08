import { BedStatus, ICacheItem, ICache } from './types'
import Queue from "../Ecg/Queue";

export const mapStatusToColor = {
    [BedStatus.Offline]: '#f4511e',
    [BedStatus.Stopped]: '#bdbdbd ',
    [BedStatus.OfflineStopped]: '#bdbdbd ',
    [BedStatus.Working]: '#43a047',

};
export const mapStatusToText = {
    [BedStatus.Offline]: '离线',
    [BedStatus.Stopped]: '停止',
    [BedStatus.OfflineStopped]: '停止',
    [BedStatus.Working]: '监护中',
};



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
        fetalposition: {fhr1:'',fhr2:'',fhr3:''},
        fetal_num: 1,
        csspan: NaN,
        ismulti: false,
        ecg: new Queue(),
        ecgdata: [],
    }, base)
}

export function cleardata(datacache: ICache, curid: string, fetal_num: number) {
    const target = datacache.get(curid)
    const empty = getEmptyCacheItem({ fetal_num, fhr: Array(fetal_num).fill(0).map(() => []) })
    // for (let fetal = 0; fetal < fetal_num; fetal++) {
    //     empty.fhr[fetal] = [];
    // }
    if (target) {
        Object.assign(target, empty)
    } else {
        datacache.set(curid, empty);
    }
}


export function convertstarttime(pureid: string) {
    if (!pureid) return new Date().toLocaleDateString()
    const t = ["/", "/", " ", ":", ":", ""]
    return '20' + pureid.split('').reduce((a, b, i) => {
        return `${a}${b}${i & 1 ? t[~~(i / 2)] : ''}`
    }, '');
}