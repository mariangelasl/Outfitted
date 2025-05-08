import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosClosetsService } from '../services/closet/datos-closets.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  nombreCloset : string = '';

  constructor(private router: Router,
    private closetService: DatosClosetsService,
  ) {}

  //para crear un closet desde el navbar

  crearCloset(): void {
    const datos = localStorage.getItem('user');
          
    if(datos){
      const usuario = JSON.parse(datos);
      
      const closet = {
        nombre: this.nombreCloset,
        user_id: usuario.id,
      };
      
      this.closetService.createCloset(closet).subscribe(resp => {
        if (resp.body) {

          //id del closet creado
          const idCloset = resp.body.id;
          
          // Redirigir al nuevo closet
          this.router.navigate(['/closet', idCloset]);
        }
      });
    }
  }


  //para saber si ha hecho login y mostrar los enlaces pertinentes
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // verifico si hay token de inicio de sesion
  }
  
  //para cerrar sesion
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    //redirijo al inicio
    this.router.navigate(['/inicio']);
  }

}
