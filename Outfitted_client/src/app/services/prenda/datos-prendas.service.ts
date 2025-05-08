import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrenda } from '../../interfaces/iprenda';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosPrendasService {

  constructor(private _http:HttpClient) { }

  public getPrendas(id:any): Observable<HttpResponse<IPrenda[]>> {
    
    return this._http.get<IPrenda[]>(environment.apiUrl + 'api/prendas/' +id,    { observe: 'response' });
    
  }

  public updatePrenda(id:any, datos:any) {
    return this._http.post<IPrenda>(environment.apiUrl + 'api/prenda/update/' +id,  datos,  { observe: 'response' });
  }

  public getPrenda(id:any) {
    return this._http.get<IPrenda>(environment.apiUrl + 'api/prenda/' + id,    { observe: 'response' });
  }

  public createPrenda(prenda:any): Observable<HttpResponse<IPrenda>> {
    
    return this._http.post<IPrenda>(environment.apiUrl + 'api/prenda/create',  prenda,  { observe: 'response' });
    
  }

  public deletePrenda(id:any) {
    return this._http.delete<IPrenda>(environment.apiUrl + 'api/prenda/' +id,  { observe: 'response' });
  }
}
