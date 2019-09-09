export interface ColumnProps {
    title: string;
    dataIndex?: string;
    onCell?: (record: {}, rowIndex: number) => any;
    children?: Array<ColumnProps>;
    display?: boolean;
}
export interface PregnancyHistoryItem {
    日期: any;
    自然: boolean;
    人工: boolean;
    药流: boolean;
    葡萄胎: boolean;
    异位妊娠: boolean;
    引产: boolean;
    死胎: boolean;
    早产: boolean;
    死产: boolean;
    足月产: boolean;
    顺产: boolean;
    剖宫产: boolean;
}
export interface ComponentProps {
    value: Array<PregnancyHistoryItem>;
    onChange: (e: any) => any;
    readOnly: boolean;
}
