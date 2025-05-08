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

  public getEstadisticas(): Observable<HttpResponse<IEstadistica[]>> {
    
    return this._http.get<IEstadistica[]>(environment.apiUrl + 'api/estadisticas',    { observe: 'response' });
    
  }

  public updateEstadistica(id:any, datos:any) {
    return this._http.put<IEstadistica>(environment.apiUrl + 'api/estadistica/' +id,  datos,  { observe: 'response' });
  }

  public getEstadistica(id:any) {
    return this._http.get<IEstadistica>(environment.apiUrl + 'api/estadistica/' + id,    { observe: 'response' });
  }

  public createEstadistica(estadistica:any): Observable<HttpResponse<IEstadistica>> {
    
    return this._http.post<IEstadistica>(environment.apiUrl + 'api/estadistica/create',  estadistica,  { observe: 'response' });
    
  }

  public deleteEstadistica(id:any) {
    return this._http.delete<IEstadistica>(environment.apiUrl + 'api/estadistica/' +id,  { observe: 'response' });
  }
}
