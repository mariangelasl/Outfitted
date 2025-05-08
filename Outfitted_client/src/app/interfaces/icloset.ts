import { IUsuario } from "./iusuario";

export interface ICloset {
    compartido: boolean;
    id:number;
    nombre:string;
    fecha_creacion:Date;
    usuario_id:number;
    usuario:IUsuario;
}
