import { WsService } from "../WsService";

import { TDeviceType } from "../types";

interface II {
    blood_oxygen: number
    dia_bp: number
    ecg: number
    ecg_arr: number[] | number
    ple_arr: number[] | number
    index: number
    mean_bp: number
    pulse_rate: number
    resp_rate: number
    sys_bp: number
    temperature: string
    temperature1: string
    cuff_bp: 0
}

interface IData {
    bed_no: 4
    data: II[]
    device_no: 18
    name: "push_data_ecg"
    device_type: TDeviceType
}

export function push_data_ecg(this: WsService, received_msg: IData) {
    const { datacache } = this

    //TODO 解析母亲应用层数据包
    var ecgdata = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    const target = datacache.get(cachbi)
    if (target) {
        ecgdata.forEach(item => {
            item.ecg_arr = Array.isArray(item.ecg_arr) ? item.ecg_arr : []
            item.ple_arr = Array.isArray(item.ple_arr) ? item.ple_arr : []


            for (let i = 0; i < item.ecg_arr.length; i++) {
                target.ecg.EnQueue(item.ecg_arr[i] & 0xff);
            }
            for (let i = 0; i < item.ple_arr.length; i++) {
                target.ple.EnQueue(item.ple_arr[i] & 0xff);
                //TODO:
                target.ismulti = true
            }

            let pulse_rate: any = item.pulse_rate;
            if (pulse_rate == 0) {
                pulse_rate = '--';
            }
            let sys_bp: any = item.sys_bp;
            if (sys_bp == 1) {
                sys_bp = '--';
            }
            let dia_bp: any = item.dia_bp;
            if (dia_bp == 1) {
                dia_bp = '--';
            }
            let mean_bp: any = item.mean_bp;
            if (mean_bp == 1) {
                mean_bp = '--';
            }
            target.ecgdata = [pulse_rate, item.blood_oxygen, `${checkTemperature(item.temperature)}${item.temperature1 ? ('~' + checkTemperature(item.temperature1)) : ''}`,pulse_rate, item.resp_rate, sys_bp + '/' + dia_bp + '/' + mean_bp];
        })

    } else {
        console.log('cache error', datacache);
    }
}

function checkTemperature(n: any) {
    const t = Number(n) || 0
    return t > 50 ? t / 10 : t
}