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

  getEventosMes(usuarioId:number, mes: number, anyo: number): Observable<HttpResponse<any[]>> {
    
    return this._http.get<ICalendario[]>(environment.apiUrl + 'api/calendario/usuario/' + usuarioId + '/' + mes + '/' + anyo,    { observe: 'response' });
  
  }
  
  createEvento(evento:any){
    return this._http.post<ICalendario>(environment.apiUrl + 'api/calendario/create',  evento,  { observe: 'response' });
  }
}
