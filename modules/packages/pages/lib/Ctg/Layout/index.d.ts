/// <reference types="react" />
import { IPrenatalVisit, IPregnancy } from '@lianmed/f_types/lib/m';
export interface IItemData {
    data: {
        pregnancy?: {
            age: any;
            name: any;
            GP: any;
            gestationalWeek: any;
            bedNO: any;
        };
        docid: string;
        starttime: string;
        status: any;
        ismulti: boolean;
    };
    bedname: string;
    unitId: string;
    id: any;
    prenatalvisit?: IPrenatalVisit;
    pregnancy?: IPregnancy;
}
interface IProps {
    RenderIn: any;
    items: IItemData[];
    listLayout: number[];
    fullScreenId?: string;
    onClose?: (data: any) => void;
    contentHeight: number;
    themeColor?: string;
    loading?: boolean;
}
declare const Home: (props: IProps) => JSX.Element;
export default Home;
