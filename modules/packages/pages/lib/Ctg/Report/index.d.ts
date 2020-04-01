import React from 'react';
export declare const Context: React.Context<{}>;
export interface IProps {
    age: string;
    docid: string;
    fetalcount: number;
    inpatientNO: string;
    name: string;
    startdate: string;
    print_interval: number;
    onDownload: () => void;
    gestationalWeek?: any;
    empId?: string;
}
declare const PrintPreview: (props: IProps) => JSX.Element;
export default PrintPreview;
