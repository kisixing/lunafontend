export default class StorageHelp {
    constructor(key: string);
    key: string;
    setItem(value: any): Promise<void>;
    get(): Promise<any[]>;
    removeItem(): Promise<void>;
}
