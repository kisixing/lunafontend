export declare enum MessageType {
    text = "text"
}
export interface Contact {
    name: string;
    unread?: number;
    latestMessage?: string;
    latestTime?: string;
}
export interface Message {
    id: number;
    type: string;
    msg: string;
    sender: string;
    receiver: string;
    timestamp: string;
}
export interface MessageMap {
    [x: string]: Message[];
}
export declare enum StompEvent {
}
