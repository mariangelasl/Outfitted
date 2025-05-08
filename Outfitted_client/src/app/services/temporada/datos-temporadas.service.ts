import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITemporada } from '../../interfaces/itemporada';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosTemporadasService {

  constructor(private _http:HttpClient) { }

  public getTemporadas(): Observable<HttpResponse<ITemporada[]>> {
    
    return this._http.get<ITemporada[]>(environment.apiUrl + 'api/temporadas',    { observe: 'response' });
    
  }

  public updateTemporada(id:any, datos:any) {
    return this._http.put<ITemporada>(environment.apiUrl + 'api/temporada/' +id,  datos,  { observe: 'response' });
  }

  public getTemporada(id:any) {
    return this._http.get<ITemporada>(environment.apiUrl + 'api/temporada/' + id,    { observe: 'response' });
  }

  public createTemporada(temporada:any): Observable<HttpResponse<ITemporada>> {
    
    return this._http.post<ITemporada>(environment.apiUrl + 'api/temporada/create',  temporada,  { observe: 'response' });
    
  }

  public deleteTemporada(id:any) {
    return this._http.delete<ITemporada>(environment.apiUrl + 'api/temporada/' +id,  { observe: 'response' });
  }
}
