import { ICategoria } from "./icategoria";
import { ICloset } from "./icloset";
import { IEstilo } from "./iestilo";
import { ITemporada } from "./itemporada";
import { IUsuario } from "./iusuario";

export interface IPrenda {

    id:number;
    imagen:string;
    color:string;
    fecha_agregado:Date;
    categoria_id:number;
    categoria:ICategoria;
    temporada_id:number;
    temporada:ITemporada;
    estilo_id:number;
    estilo:IEstilo;
    closet_id:number;
    closet:ICloset;
    usuario_id:number;
    usuario:IUsuario;
    imagen_url:string;
    
}

