import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOutfit } from '../../interfaces/ioutfit';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DatosOutfitsService {

  constructor(private _http:HttpClient) { }

  public getOutfits(id:any): Observable<HttpResponse<IOutfit[]>> {
    
    return this._http.get<IOutfit[]>(environment.apiUrl + 'api/outfits/' + id,    { observe: 'response' });
    
  }

  public updateOutfit(id:any, datos:any) {
    return this._http.post<IOutfit>(environment.apiUrl + 'api/outfit/update/' +id,  datos,  { observe: 'response' });
  }

  public getOutfit(id:any) {
    return this._http.get<IOutfit>(environment.apiUrl + 'api/outfit/' + id,    { observe: 'response' });
  }

  public createOutfit(outfit:any): Observable<HttpResponse<IOutfit>> {
    
    return this._http.post<IOutfit>(environment.apiUrl + 'api/outfit/create',  outfit,  { observe: 'response' });
    
  }

  public deleteOutfit(id:any) {
    return this._http.delete<IOutfit>(environment.apiUrl + 'api/outfit/' +id,  { observe: 'response' });
  }
}
