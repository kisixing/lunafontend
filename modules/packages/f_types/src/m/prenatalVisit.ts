import { ICtgexam } from "./ctgexam";
import { IPregnancy } from "./pregnancy";

export interface IPrenatalVisit {
    ctgexam: ICtgexam;
    doctor: any;
    gestationalWeek: any;
    id: number;
    visitDate: string;
    visitTime: string;
    visitType: any;
    pregnancy: IPregnancy
    appointmentDate: any
    diagnosis: any
    diagnosisCode: any
    ecgexam: any
    gynecologicalExam: any
}