import { Cst } from "./Cst";
import { Cstoct } from "./Cstoct";
import { Fischer } from "./Fischer";
import { Krebs } from "./Krebs";
import { Nst } from "./Nst";
import { Sogc } from "./Sogc";


const strategies = {
    Cst,
    Cstoct,
    Fischer,
    Krebs,
    Nst,
    Sogc,
}
export default (key:string,oldData)=>{
    const s = strategies[key]
    return s && s(oldData);

}