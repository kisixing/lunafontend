import { WsService } from "../WsService";

type TF = 0 | 1
interface IData {
    data: {
        isMute1: TF
        vol: TF
        fetel_num: number
    }
    bed_no: number
    name: "getVolume"
    device_no: number
}

export function getVolume(this: WsService, received_msg: IData) {
    const { device_no, bed_no } = received_msg
    const unitId = this.getUnitId(device_no, bed_no)
    const target = this.datacache.get(unitId)
    if (!target) return
    target.volumeData = received_msg.data
    this.refresh('getVolume')
}

