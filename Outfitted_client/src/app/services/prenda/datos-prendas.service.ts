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

  //obtener todas las prendas de un closet
  public getPrendas(id:any): Observable<HttpResponse<IPrenda[]>> {
    
    return this._http.get<IPrenda[]>(environment.apiUrl + 'api/prendas/' +id,    { observe: 'response' });
    
  }

  //actualizar datos de una prenda
  public updatePrenda(id:any, datos:any) {
    return this._http.post<IPrenda>(environment.apiUrl + 'api/prenda/update/' +id,  datos,  { observe: 'response' });
  }

  //obtener una prenda
  public getPrenda(id:any) {
    return this._http.get<IPrenda>(environment.apiUrl + 'api/prenda/' + id,    { observe: 'response' });
  }

  //crear una prenda
  public createPrenda(prenda:any): Observable<HttpResponse<IPrenda>> {
    
    return this._http.post<IPrenda>(environment.apiUrl + 'api/prenda/create',  prenda,  { observe: 'response' });
    
  }

  //eliminar una prenda
  public deletePrenda(id:any) {
    return this._http.delete<IPrenda>(environment.apiUrl + 'api/prenda/' +id,  { observe: 'response' });
  }
}
