import { WsService } from "../WsService";

import { TDeviceType, TAlarmType } from "../types";
import { event } from "@lianmed/utils";
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


    alarm_pulse_rate: TAlarmType
    alarm_sys_bp: TAlarmType
    alarm_mean_bp: TAlarmType
    alarm_blood_oxygen: TAlarmType
    alarm_offline_blood_temperature: TAlarmType
    alarm_temperature: TAlarmType
    alarm_dia_bp: TAlarmType
    alarm_offline_blood_oxygen: TAlarmType
    power: number



    //多参报警
    //0：无报警  1：过低报警  2：过高报警

}
const mapAlarmToText = {
    alarm_sys_bp: '收缩压',
    alarm_mean_bp: '平均压',
    alarm_dia_bp: '舒张压',
    alarm_pulse_rate: '脉率',
    alarm_blood_oxygen: '血氧',
    alarm_temperature: '体温',
    // alarm_offline_blood_oxygen: '血氧探头脱落',
    // alarm_offline_blood_temperature: '体温探头脱落'
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
    var data = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    const target = datacache.get(cachbi)
    if (target) {
        data.forEach(item => {
            item.ecg_arr = Array.isArray(item.ecg_arr) ? item.ecg_arr : []
            item.ple_arr = Array.isArray(item.ple_arr) ? item.ple_arr : []

            const { ecg_arr, ple_arr, pulse_rate, sys_bp, dia_bp, mean_bp, temperature, temperature1, blood_oxygen, resp_rate, index, ecg, power, cuff_bp, ...o } = item
            // o.alarm_blood_oxygen = 2
            // o.alarm_dia_bp = 1
            target.alarms = Object.assign(Object.create(null), target.alarms, o)
            Object.keys(o).forEach(k => {
                const value = o[k]
                if (!value) return
                const text = mapAlarmToText[k]
                const valueText = value === 1 ? '过低' : '过高'
                if (text) {
                    event.emit('item:alarm', cachbi, 2, text + valueText)
                    event.emit('audio:alarm', 2)
                }
            })
            for (let i = 0; i < ecg_arr.length; i++) {
                target.ecg.EnQueue(ecg_arr[i] & 0xff);
            }
            for (let i = 0; i < ple_arr.length; i++) {
                target.ple.EnQueue(ple_arr[i]);
                //TODO:
                target.ismulti = true
            }



            target.ecgdata = {
                pulseRate: checkPulseRate(pulse_rate),
                bloodOxygen: blood_oxygen,
                temperature: `${checkTemperature(temperature)}${temperature1 ? ('~' + checkTemperature(item.temperature1)) : ''}`,
                heartRate: checkPulseRate(pulse_rate),
                respRate: resp_rate,
                // `${checkBlood(sys_bp)}/${checkBlood(dia_bp)}/${checkBlood(mean_bp)}`,
                bloodPress: checkBlood(cuff_bp)
            };
        })

    } else {
        console.log('cache error', datacache);
    }
}

function checkTemperature(n: any) {
    const t = Number(n) || 0
    return t > 50 ? t / 10 : t
}
function checkBlood(n: number) {
    return n === 1 ? '--' : (n && n.toString())
}
function checkPulseRate(n: number) {
    return n === 0 ? '--' : (n && n.toString())
}
