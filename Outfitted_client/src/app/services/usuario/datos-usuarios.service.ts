import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../../interfaces/iusuario';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuariosService {

  constructor(private _http:HttpClient) { }

  public getUsuarios(): Observable<HttpResponse<IUsuario[]>> {
    
    return this._http.get<IUsuario[]>(environment.apiUrl + 'api/usuarios',    { observe: 'response' });
    
  }

  public updateUsuario(id:any, datos:any) {
    return this._http.put<IUsuario>(environment.apiUrl + 'api/usuario/' +id,  datos,  { observe: 'response' });
  }

  public getUsuario(id:any) {
    return this._http.get<IUsuario>(environment.apiUrl + 'api/usuario/' + id,    { observe: 'response' });
  }

  public createUsuario(usuario:any): Observable<HttpResponse<IUsuario>> {
    
    return this._http.post<IUsuario>(environment.apiUrl + 'api/usuario/create',  usuario,  { observe: 'response' });
    
  }

  public deleteUsuario(id:any) {
    return this._http.delete<IUsuario>(environment.apiUrl + 'api/usuario/' +id,  { observe: 'response' });
  }
}
