import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICloset } from '../../interfaces/icloset';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  constructor(private _http:HttpClient) { }

  compartirCloset(datos: any): Observable<any> {
    return this._http.post(environment.apiUrl + 'api/compartido/create',  datos,  { observe: 'response' });
}

getClosetsCompartidos(id: number): Observable<HttpResponse<ICloset[]>> {
    return this._http.get<ICloset[]>(environment.apiUrl + 'api/compartidos/' + id,    { observe: 'response' });

}

}
