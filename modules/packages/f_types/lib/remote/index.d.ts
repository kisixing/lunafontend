import { IPregnancy, IPrenatalVisit } from "../m";
export declare namespace remote {
    namespace serviceorders {
        interface get {
            diagnosis: string;
            doctor: any;
            id: number;
            payment: string;
            paystate: number;
            paytype: string;
            pregnancy: IPregnancy;
            prenatalvisit: IPrenatalVisit;
            prescription: any;
            result: string;
            sn: string;
            state: number;
            type: string;
        }
    }
}
