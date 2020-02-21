import Dexie from 'dexie';
declare class ImDb {
    pageLimit: number;
    db: Dexie;
    $_TABLE: Dexie.Table<{
        [x: string]: any;
    }, string>;
    init(username: string, pageLimit?: number): void;
    exec(cb1: any, cb2?: Function): Promise<unknown>;
    getUnreadList(): Promise<unknown>;
    fetchMessage(id: any, chatType: string, offset: number, limit: any): Promise<unknown>;
    readMessage(chatType: any, id: any): Promise<unknown>;
    updateMessageStatus(id: any, status: any): Promise<unknown>;
    deleteMessage(id: any): Promise<unknown>;
    updateMessageMid(mid: any, id: any): void;
    addMessage(message: any, isUnread?: number): Promise<unknown>;
    clearMessage(chatType: any, id: any): Promise<unknown>;
}
declare const imDb: ImDb;
export default imDb;
