import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICalendario } from '../../interfaces/icalendario';

@Injectable({
  providedIn: 'root'
})
export class DatosCalendariosService {

  constructor(private _http:HttpClient) { }

  public getCalendarios(): Observable<HttpResponse<ICalendario[]>> {
    
    return this._http.get<ICalendario[]>(environment.apiUrl + 'api/calendarios',    { observe: 'response' });
    
  }

  public updateCalendario(id:any, datos:any) {
    return this._http.put<ICalendario>(environment.apiUrl + 'api/calendario/' +id,  datos,  { observe: 'response' });
  }

  public getCalendario(id:any) {
    return this._http.get<ICalendario>(environment.apiUrl + 'api/calendario/' + id,    { observe: 'response' });
  }

  /*public createCalendario(calendario:any): Observable<HttpResponse<ICalendario>> {
    
    return this._http.post<ICalendario>(environment.apiUrl + 'api/calendario/create',  calendario,  { observe: 'response' });
    
  }*/

  public deleteCalendario(id:any) {
    return this._http.delete<ICalendario>(environment.apiUrl + 'api/calendario/' +id,  { observe: 'response' });
  }

  getEventosMes(usuarioId:number, mes: number, anyo: number): Observable<HttpResponse<any[]>> {
    
    return this._http.get<ICalendario[]>(environment.apiUrl + 'api/calendario/usuario/' + usuarioId + '/' + mes + '/' + anyo,    { observe: 'response' });
  
  }
  
  createEvento(evento:any){
    return this._http.post<ICalendario>(environment.apiUrl + 'api/calendario/create',  evento,  { observe: 'response' });
  }
}
