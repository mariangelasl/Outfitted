import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstadistica } from '../../interfaces/iestadistica';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosEstadisticasService {

  constructor(private _http:HttpClient) { }

  public getEstadistica(id:any) {
    return this._http.get<IEstadistica>(environment.apiUrl + 'api/estadistica/' + id,    { observe: 'response' });
  }

  public getPrendaMasUsada(idUsuario:any) {
    return this._http.get(environment.apiUrl + 'api/estadistica/mas-usada/' + idUsuario,    { observe: 'response' });
  }

  public getPrendaMenosUsada(idUsuario:any) {
    return this._http.get(environment.apiUrl + 'api/estadistica/menos-usada/' + idUsuario,    { observe: 'response' });
  }

  public getColorMasUsado(idUsuario:any) {
    return this._http.get<{ color: string }>(environment.apiUrl + 'api/estadistica/color/' + idUsuario);
  }

  public getOutfitsSinUsar(idUsuario:any) {
    return this._http.get<any[]>(environment.apiUrl + 'api/estadistica/outfits/' + idUsuario);
  }

  public getPrendasSinUsar(idUsuario:any) {
    return this._http.get<any[]>(environment.apiUrl + 'api/estadistica/prendas/' + idUsuario);
  }

}
