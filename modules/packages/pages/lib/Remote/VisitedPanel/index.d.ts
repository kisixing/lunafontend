/// <reference types="react" />
export interface IVisit {
    title: string;
    iconUrl: string;
    url: string;
    name: string;
    reload: boolean;
}
export declare type VisitedData = IVisit[];
interface IDataItem {
    url: string;
    name: string;
    reload?: boolean;
}
interface IProps {
    remote_url?: string;
    public_url?: string;
    data?: IDataItem[];
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
