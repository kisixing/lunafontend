import { WsService } from "../WsService";
import { convertstarttime } from "../utils";


interface IData {
    name: "heard"
    data: { time: any }
}

export function heard(this: WsService, received_msg: IData) {
    //heard
    let devdata = received_msg.data;
    let servertime = convertstarttime(devdata.time);
    this.span = Math.floor(new Date(servertime).getTime() / 1000 - new Date().getTime() / 1000) * 4 - 12;
    // console.log(2222, new Date(servertime.replace(/-/g,'/')), +new Date());
}