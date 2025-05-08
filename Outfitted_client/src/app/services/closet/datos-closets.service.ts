import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICloset } from '../../interfaces/icloset';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosClosetsService {

  constructor(private _http:HttpClient) { }

  //obtengo todos los closets de ese usuario
  public getClosets(id:any): Observable<HttpResponse<ICloset[]>> {
    
    return this._http.get<ICloset[]>(environment.apiUrl + 'api/closets/' + id,    { observe: 'response' });
    
  }

  public updateCloset(id:any, datos:any) {
    return this._http.put<ICloset>(environment.apiUrl + 'api/closet/' +id,  datos,  { observe: 'response' });
  }

  public getCloset(id:any) {
    return this._http.get<ICloset>(environment.apiUrl + 'api/closet/' + id,    { observe: 'response' });
  }

  public createCloset(closet:any): Observable<HttpResponse<ICloset>> {
    
    return this._http.post<ICloset>(environment.apiUrl + 'api/closet/create',  closet,  { observe: 'response' });
    
  }

  public deleteCloset(id:any) {
    return this._http.delete<ICloset>(environment.apiUrl + 'api/closet/' +id,  { observe: 'response' });
  }
}
