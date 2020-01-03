import { WsService } from "../WsService";

interface II {
    type: "update_subscribe_device"
    content: {
        devices: string // "243,28,39,21"
        wardId: string
    }[]
}

interface IData {
    data: II
    name: "push_notification"
    target: number
}

export function update_subscribe_device(this: WsService, received_msg: IData) {
    const { content } = received_msg.data


    this.emit(WsService.EWsEvents.updateSubscriptionIfNecessary, content.map(_ => _.wardId))
}