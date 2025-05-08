import { ICloset } from "./icloset";
import { IPrenda } from "./iprenda";

export interface IOutfit {

    id:number;
    nombre:string;
    fecha_creacion:Date;
    closet_id:number;
    closet:ICloset;
    prendas:IPrenda[];
    
}
