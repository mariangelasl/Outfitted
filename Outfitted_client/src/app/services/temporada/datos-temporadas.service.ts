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

  public getTemporada(id:any) {
    return this._http.get<ITemporada>(environment.apiUrl + 'api/temporada/' + id,    { observe: 'response' });
  }

}
