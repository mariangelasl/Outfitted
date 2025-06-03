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

  //obtengo todos los closets de un usuario, indicando su id
  public getClosets(id:any): Observable<HttpResponse<ICloset[]>> {
    
    return this._http.get<ICloset[]>(environment.apiUrl + 'api/closets/' + id,  { observe: 'response' });
    
  }

  //actualizar la informacion de un closet
  public updateCloset(id:any, datos:any) {
    return this._http.put<ICloset>(environment.apiUrl + 'api/closet/' +id,  datos,  { observe: 'response' });
  }

  //obtener un closet por su id
  public getCloset(id:any, userId:any) {
    return this._http.get<ICloset>(environment.apiUrl + 'api/closet/' + id + '?user_id=' + userId,   { observe: 'response' });
  }

  //crear un closet
  public createCloset(closet:any): Observable<HttpResponse<ICloset>> {
    
    return this._http.post<ICloset>(environment.apiUrl + 'api/closet/create',  closet,  { observe: 'response' });
    
  }

  //eliminar el closet
  public deleteCloset(id:any, userId:any) {
    return this._http.delete<ICloset>(environment.apiUrl + 'api/closet/' +id + '/delete?user_id=' + userId,   { observe: 'response' });
  }
}
