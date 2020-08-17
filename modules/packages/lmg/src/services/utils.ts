import { BedStatus, ICacheItem, ICache, TWsReqeustType } from './types'
import Queue from "../Ecg/Queue";
import message from 'antd/lib/message/index';

export const mapStatusToColor = {
    [BedStatus.Offline]: '#bdbdbd',
    [BedStatus.Stopped]: '#bdbdbd ',
    [BedStatus.OfflineStopped]: '#bdbdbd ',
    [BedStatus.Working]: '#43a047',
    [BedStatus.Uncreated]: '#bdbdbd',

};
export const mapStatusToText = {
    [BedStatus.Offline]: '离线',
    [BedStatus.Stopped]: '停止',
    [BedStatus.OfflineStopped]: '停止',
    [BedStatus.Working]: '监护中',
    [BedStatus.Uncreated]: '未创建',
};
export const f0Pro_errText: { [x in TWsReqeustType]: { [x: number]: string } } = {
    allot_probe: {
        1: '创建监护失败，胎心探头不足',
        2: '创建监护失败，宫缩探头不足'
    },
    release_probe: {
        1: '添加失败，缺少可用宫缩探头'
    },
    add_more_fhr_probe: {
        1: '添加失败，缺少可用宫缩探头'
    },
    add_toco_probe: {
        1: '添加失败，缺少可用宫缩探头',
        2: '添加失败，已存在宫缩探头'
    },
    replace_probe: {
        1: '添加失败，缺少可用宫缩探头'
    }
}
export const handleF0ProErr = (k: string, status: number | string) => {
    if (f0Pro_errText[k] && f0Pro_errText[k][status]) {
        message.info(f0Pro_errText[k][status])
    }
}

// const MAX_SIZE = 4 * 3600 * 24 * 2
export function getMaxArray() {
    // return new Uint8Array(MAX_SIZE)
    return [] as number[]
}
export function getEmptyCacheItem(base: { [x in keyof ICacheItem]?: ICacheItem[x] }) {
    base.fetal_num = base.fetal_num ? base.fetal_num : 1
    const { fetal_num } = base
    const item = new ICacheItem({
        batterylowArr:[],
        id: '0',
        fhr: Array(fetal_num).fill(0).map(() => getMaxArray()),
        toco: getMaxArray(),
        fm: getMaxArray(),
        fmp: getMaxArray(),
        index: 0,
        length: 0,
        start: -1,
        last: 0,
        past: 0,
        timestamp: 0,
        docid: 'INIT',
        status: BedStatus.Offline,
        orflag: true,
        starttime: '',
        pregnancy: null,
        fetalposition: { fhr1: '', fhr2: '', fhr3: '' },
        fetal_num: 1,
        csspan: NaN,
        ismulti: false,
        ecg: new Queue(),
        ple: new Queue(240),
        ecgdata: null,
        is_include_volume: false,
        is_include_tocozero: false,
        is_include_toco: false,
        realTime: true,
        alarms: Object.create(null),
        ...base
    })
    return item
}

export function cleardata(datacache: ICache, curid: string, fetal_num: number) {
    console.log('cleardata', curid)
    const target = datacache.get(curid)
    const empty = getEmptyCacheItem({ fetal_num, fhr: Array(fetal_num).fill(0).map(() => getMaxArray()), id: curid })
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