import { WsService } from "../WsService";
import message from "antd/lib/message/index";
interface IData {
    data: { toast_msg: string }
    name: string

}

export function toast(this: WsService, received_msg: IData) {
    // const { datacache } = this
    //结束监护页
    message.info(received_msg.data.toast_msg)
}