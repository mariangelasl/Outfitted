import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstadistica } from '../../interfaces/iestadistica';
import { environment } from '../../../environments/environment.development';
import { IOutfit } from '../../interfaces/ioutfit';
import { IPrenda } from '../../interfaces/iprenda';

@Injectable({
  providedIn: 'root'
})
export class DatosEstadisticasService {

  constructor(private _http:HttpClient) { }

  public getEstadistica(id:any) {
    return this._http.get<IEstadistica>(environment.apiUrl + 'api/estadistica/' + id,    { observe: 'response' });
  }

  //obtener la prenda mas usada (en los outfits asignado al calendario) de ese usuario
  public getPrendaMasUsada(idUsuario:any) {
    return this._http.get(environment.apiUrl + 'api/estadistica/mas-usada/' + idUsuario,    { observe: 'response' });
  }

  //prenda menos usada del usuario
  public getPrendaMenosUsada(idUsuario:any) {
    return this._http.get(environment.apiUrl + 'api/estadistica/menos-usada/' + idUsuario,    { observe: 'response' });
  }

  public getColorMasUsado(idUsuario:any) {
    return this._http.get<{ color: string }>(environment.apiUrl + 'api/estadistica/color/' + idUsuario);
  }

  //outfits que fueron creados y aun no se usan (no han sido agregados al calendario)
  public getOutfitsSinUsar(idUsuario:any) {
    return this._http.get<IOutfit[]>(environment.apiUrl + 'api/estadistica/outfits/' + idUsuario);
  }

  //prendas que se crearon pero aun no han sido utilizadas en algun outfit
  public getPrendasSinUsar(idUsuario:any) {
    return this._http.get<IPrenda[]>(environment.apiUrl + 'api/estadistica/prendas/' + idUsuario);
  }

}
