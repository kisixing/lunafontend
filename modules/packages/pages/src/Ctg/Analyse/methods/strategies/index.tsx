import { Cst } from "./Cst";
import { Cstoct } from "./Cstoct";
import { Fischer } from "./Fischer";
import { Krebs } from "./Krebs";
import { Nst } from "./Nst";
import { Sogc } from "./Sogc";
import { obvue } from "@lianmed/f_types";


const strategies = {
    Cst,
    Cstoct,
    Fischer,
    Krebs,
    Nst,
    Sogc,
}

export default (key: string, oldData, initData: obvue.ctg_exams_analyse) => {
    const s = strategies[key]
    return s && s(oldData,initData.analysis);

}