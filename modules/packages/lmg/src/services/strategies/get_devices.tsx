import { WsService } from "../WsService";

type TF = 0 | 1
interface IData {
    data: {
        isMute1: TF
        vol: TF
        fetel_num: number
    }
    bed_no: number
    name: "get_devices"
    device_no: number
}

export function get_devices(this: WsService, received_msg: IData) {
    // this.log('get_devices', received_msg.data);
    // var devlist = received_msg.data;
    // for (var i in devlist) {
    //     var devdata = devlist[i];
    //     if (!devdata) continue;
    // }
}

