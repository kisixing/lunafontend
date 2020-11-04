interface IPageData {
    current: number;
    pageSize: number;
    total?: number;
    [x: string]: any;
}
interface IDict {
    [x: string]: any;
}
declare type TGenParams = () => Promise<IDict>;
export declare const usePage: <T extends {}>(model: string, initParams?: IPageData, genParams?: TGenParams, keyMaps?: Record<string, any>) => {
    loading: boolean;
    listData: T[];
    pagination: IPageData;
    fetchList: (runtimeParams?: {
        [x: string]: any;
        current?: number;
        pageSize?: number;
    }) => void;
    createItem: (data: {
        [x: string]: any;
    }) => Promise<void>;
    removeItem: (data: {
        [x: string]: any;
    }) => Promise<void>;
    updateItem: (data: {
        [x: string]: any;
    }) => Promise<void>;
    getItems: (params?: {
        [x: string]: any;
    }) => Promise<T[]>;
};
export {};
