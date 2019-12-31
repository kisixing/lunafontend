import { WsService } from "../WsService";



interface II {
    blood_oxygen: number
    dia_bp: number
    ecg: number
    ecg_arr: number[]
    index: number
    mean_bp: number
    pulse_rate: number
    resp_rate: number
    sys_bp: number
    temperature: string
    temperature1: string
}

interface IData {
    bed_no: 4
    data: II[]
    device_no: 18
    name: "push_data_ecg"
}

export function push_data_ecg(this: WsService, received_msg: IData) {
    const { datacache } = this

    //TODO 解析母亲应用层数据包
    var ecgdata = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    if (datacache.has(cachbi)) {
        for (let eindex = 0; eindex < ecgdata.length; eindex++) {
            for (let elop = 0; elop < ecgdata[eindex].ecg_arr.length; elop++) {
                datacache.get(cachbi).ecg.EnQueue(ecgdata[eindex].ecg_arr[elop] & 0xff);
            }
            let pulse_rate: any = ecgdata[eindex].pulse_rate;
            if (pulse_rate == 0) {
                pulse_rate = '--';
            }
            let sys_bp: any = ecgdata[eindex].sys_bp;
            if (sys_bp == 1) {
                sys_bp = '--';
            }
            let dia_bp: any = ecgdata[eindex].dia_bp;
            if (dia_bp == 1) {
                dia_bp = '--';
            }
            let mean_bp: any = ecgdata[eindex].mean_bp;
            if (mean_bp == 1) {
                mean_bp = '--';
            }
            datacache.get(cachbi).ecgdata = [pulse_rate, ecgdata[eindex].blood_oxygen, ecgdata[eindex].temperature, ecgdata[eindex].temperature1, pulse_rate, ecgdata[eindex].resp_rate, sys_bp + '/' + dia_bp + '/' + mean_bp];
        }
    } else {
        console.log('cache error', datacache);
    }
}