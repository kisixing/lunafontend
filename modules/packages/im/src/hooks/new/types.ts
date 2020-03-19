export enum MessageType {
    text = 'text'
}
export interface IContact {
    name: string
    unread?: number
    latestMessage?: string
    latestTime?: string
}
export interface IMessage {
    id?: number
    type: string
    msg: string
    sender?: string
    receiver: string
    timestamp?: string
    isHead?: boolean
    unread?: boolean
    bySelf?: boolean
}

export interface IMessageMap {
    [x: string]: IMessage[]
}
export enum StompEvent {

}