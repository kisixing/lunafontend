import { WsService } from "../WsService";
import { message } from "antd";
interface IData {
    data: { title: string, content: string }
    ip: string
    name: string
    target: number
}

export function endpoint_user_confirm_msg(this: WsService, received_msg: IData) {
    // const { datacache } = this
    //结束监护页
    message.info(received_msg.data.content)
}