import { IOutfit } from "./ioutfit";
import { IUsuario } from "./iusuario";

export interface ICalendario {

    id:number;
    fecha_inicio:Date;
    fecha_fin:Date;
    usuario_id:number;
    usuario:IUsuario;
    outfit_id:number;
    outfit:IOutfit;
    
}
