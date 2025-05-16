import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuariosService {

  public getUsuario(): any {

    /*
    const datos = localStorage.getItem('user');
    return datos ? JSON.parse(datos) : null;*/

    try {
    if (typeof window !== 'undefined' && localStorage) {
      const datos = localStorage.getItem('user');
      return datos ? JSON.parse(datos) : null;
    }
    } catch (e) {
      console.warn('No se pudo acceder a localStorage:', e);
    }
    return null;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public guardarUsuario(user: any, token: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  public limpiarSesion(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }  

}
