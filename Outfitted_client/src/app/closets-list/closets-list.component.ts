import { Component, OnInit } from '@angular/core';
import { ICloset } from '../interfaces/icloset';
import { DatosClosetsService } from '../services/closet/datos-closets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closets-list',
  standalone: false,
  templateUrl: './closets-list.component.html',
  styleUrl: './closets-list.component.css'
})

export class ClosetsListComponent implements OnInit{

  nombreUsuario: string = '';
  closets: ICloset[] = [];
  closetsPropios: ICloset[] = [];
  closetsCompartidos: ICloset[] = [];
  nombreCloset : string = '';
  closetFilter: string ='';
  userId : number = 0;
  constructor(private closetService: DatosClosetsService,
              private router: Router,
  ){ }

  ngOnInit(): void {

    //obtengo el usuario actual
    const datos = localStorage.getItem('user');
    
    if (datos) {

      //obtengo datos del usuario
      const usuario = JSON.parse(datos);
      this.userId = usuario.id; 
      this.nombreUsuario = usuario.name;

      //Closets que pertenecen a ese usuario
      this.closetService.getClosets(this.userId).subscribe(resp => {
        if(resp.body) this.closetsPropios = resp.body;
      });


      //closets compartidos con este usuario

      this.compartidoService.getCompartidos(this.userId).subscribe(resp => {
        if(resp.body) this.closetsCompartidos = resp.body;
      });

      //todos los closets

      this.closets = this.closetsPropios.concat(this.closetsCompartidos);
    } 
  }
    
  
  //crear nuevo closet si se presiona el boton de 'nuevo armario'

   crearCloset(): void {
    
    //const datos = localStorage.getItem('user');
          
    //if(datos){
      
      //const usuario = JSON.parse(datos);
      
      const closet = {
            nombre: this.nombreCloset,
            user_id: this.userId,
      };
      
      this.closetService.createCloset(closet).subscribe(resp => {
        if (resp.body) {
          const idCloset = resp.body.id;
          
          // Redirigir al view del nuevo closet
          this.router.navigate(['/closet', idCloset]);
        }
      });
    //}
  }     
  
}
