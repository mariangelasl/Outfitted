import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from '../../interfaces/icategoria';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosCategoriasService {

  constructor(private _http:HttpClient) { }

  public getCategorias(): Observable<HttpResponse<ICategoria[]>> {
    
    return this._http.get<ICategoria[]>(environment.apiUrl + 'api/categorias',    { observe: 'response' });
    
  }

  public updateCategoria(id:any, datos:any) {
    return this._http.put<ICategoria>(environment.apiUrl + 'api/categoria/' +id,  datos,  { observe: 'response' });
  }

  public getCategoria(id:any) {
    return this._http.get<ICategoria>(environment.apiUrl + 'api/categoria/' + id,    { observe: 'response' });
  }

  public createCategoria(categoria:any): Observable<HttpResponse<ICategoria>> {
    
    return this._http.post<ICategoria>(environment.apiUrl + 'api/categoria/create',  categoria,  { observe: 'response' });
    
  }

  public deleteCategoria(id:any) {
    return this._http.delete<ICategoria>(environment.apiUrl + 'api/categoria/' +id,  { observe: 'response' });
  }

}
