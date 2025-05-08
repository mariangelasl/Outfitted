import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstilo } from '../../interfaces/iestilo';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosEstilosService {

  constructor(private _http:HttpClient) { }

  public getEstilos(): Observable<HttpResponse<IEstilo[]>> {
    
    return this._http.get<IEstilo[]>(environment.apiUrl + 'api/estilos',    { observe: 'response' });
    
  }

  public updateEstilo(id:any, datos:any) {
    return this._http.put<IEstilo>(environment.apiUrl + 'api/estilo/' +id,  datos,  { observe: 'response' });
  }

  public getEstilo(id:any) {
    return this._http.get<IEstilo>(environment.apiUrl + 'api/estilo/' + id,    { observe: 'response' });
  }

  public createEstilo(estilo:any): Observable<HttpResponse<IEstilo>> {
    
    return this._http.post<IEstilo>(environment.apiUrl + 'api/estilo/create',  estilo,  { observe: 'response' });
    
  }

  public deleteEstilo(id:any) {
    return this._http.delete<IEstilo>(environment.apiUrl + 'api/estilo/' +id,  { observe: 'response' });
  }
}
