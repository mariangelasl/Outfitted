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

  public getEstilo(id:any) {
    return this._http.get<IEstilo>(environment.apiUrl + 'api/estilo/' + id,    { observe: 'response' });
  }

}
