export declare enum MessageType {
    text = "text"
}
export interface IContact {
    name: string;
    unread?: number;
    latestMessage?: string;
    latestTime?: string;
}
export interface IMessage {
    id: number;
    type: string;
    msg: string;
    sender: string;
    receiver: string;
    timestamp: string;
    unread?: boolean;
}
export interface IMessageMap {
    [x: string]: IMessage[];
}
export declare enum StompEvent {
}
