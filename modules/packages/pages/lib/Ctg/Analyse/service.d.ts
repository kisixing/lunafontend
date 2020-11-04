import { TableListParams, TableListItem, TableListData, historyItem, CtgLable } from './data.d';
export declare function queryRule(data: TableListParams): Promise<{
    data: TableListData;
    total: number;
    success: boolean;
    pageSize: number;
    current: number;
}>;
export declare function queryHistory(data: {
    note: any;
}): Promise<historyItem[]>;
export declare function removeHistory(params: {
    id: any;
}): Promise<unknown>;
export declare function updateHistory(data: historyItem): Promise<unknown>;
export declare function addRule(params: TableListItem): Promise<unknown>;
export declare function updateLable(data: CtgLable): Promise<unknown>;
