import { WsService } from "../WsService";

interface II {
    type: "update_subscribe_device" | ''
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

export function push_notification(this: WsService, received_msg: IData) {
    const { content, type } = received_msg.data

    if (type === 'update_subscribe_device') {
        this.emit(WsService.EWsEvents.updateSubscriptionIfNecessary, content.map(_ => _.wardId))
    }
}