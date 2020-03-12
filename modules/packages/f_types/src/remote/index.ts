import { IPregnancy, IPrenatalVisit } from "../m";

export namespace remote {
    export namespace serviceorders {
        export interface get {
            diagnosis: string
            doctor: any
            id: number
            payment: string
            paystate: number
            paytype: string
            pregnancy: IPregnancy
            prenatalvisit: IPrenatalVisit
            prescription: any
            result: string
            sn: string
            state: number
            type: string
        }
    }
}

