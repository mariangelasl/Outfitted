import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IUsuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  public login(credentials: { email: string; password: string }): Observable<any> {
    return this._http.post(environment.apiUrl + 'api/login', credentials, { observe: 'response', headers: { 'Accept': 'application/json' } });
  }

  public registrar(data: { name: string; email: string; password: string;}): Observable<any> {
    return this._http.post(environment.apiUrl + 'api/registro', data, { observe: 'response', headers: { 'Accept': 'application/json' } });
  }

  public logout(): Observable<any> {
    return this._http.post(environment.apiUrl + 'api/logout', {} , { observe: 'response' , headers: { 'Accept': 'application/json' }});
  }

  public esUsuario(correo:string): Observable<any>{

    return this._http.get(environment.apiUrl + 'api/login/usuario/' + correo,  { observe: 'response' });
    
  }

  public yaRegistrado(correo:string): Observable<any>{

    return this._http.get(environment.apiUrl + 'api/registro/yaRegistrado/' + correo,  { observe: 'response' });
    
  }
}
