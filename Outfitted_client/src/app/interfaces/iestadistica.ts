import { IPrenda } from "./iprenda";

export interface IEstadistica {

    id:number;
    fecha_uso: Date;
    veces: number;
    prenda_id:number;
    prenda:IPrenda;
}
