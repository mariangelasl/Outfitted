import { Component, Input, OnInit } from '@angular/core';
import { DatosOutfitsService } from '../services/outfit/datos-outfits.service';
import { IOutfit } from '../interfaces/ioutfit';
import { DatosCalendariosService } from '../services/calendario/datos-calendarios.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { DatosUsuariosService } from '../services/usuario/datos-usuarios.service';

@Component({
  selector: 'app-outfit-list',
  standalone: false,
  templateUrl: './outfit-list.component.html',
  styleUrl: './outfit-list.component.css'
})
export class OutfitListComponent implements OnInit {

  @Input() idCloset!: number; //se lo paso desde el componente incrustado en el closet view

  //si vengo al listado de outfits al seleccionar un evento en el calendario
  @Input() filtroCalendario: string = '';

  outfits: IOutfit[] = [];
  idOutfit : number = 0;
  outfitFilter:string = ''; //para filtrar la lista por nombre de outfit


  //para agregar outfits al calendario
  outfitSeleccionado:any = null;
  fechaInicio:string = '';
  fechaFin:string = '';
  errorMessage:string ='';

  constructor(private outfitService: DatosOutfitsService,
              private calendarioService: DatosCalendariosService,
              private router: Router,
              private usuarioService: DatosUsuariosService,

  ){ }

  ngOnInit(): void {

    //filtro por el nombre del evento del calendario
    this.outfitFilter = this.filtroCalendario;

    //obtengo los outfits de ese closet
    this.outfitService.getOutfits(this.idCloset).subscribe(resp => {

      if(resp.body)
        this.outfits = resp.body;
    });
  }

  //abre el modal para confirmar la eliminacion
  abrirModal(id: number) {
    this.idOutfit = id; //recoje el id del outfit a eliminar
  }

  //elimina el outfit
  eliminar(): void {
    this.outfitService.deleteOutfit(this.idOutfit).subscribe({
      next: (data) => {

        // recargamos el listado luego de eliminar el outfit
        this.ngOnInit();
      }
    });
  }

  //metodos para asignar outfit al calendario

  abrirModalFechas(outfit: any): void {
    this.outfitSeleccionado = outfit;
    this.fechaInicio = '';
    this.fechaFin = '';
    this.errorMessage = '';
  }

  agendarOutfit(): void {
    const hoy = new Date().toISOString().split('T')[0];
  
    //si no ha seleccionado alguna fecha
    if (!this.fechaInicio || !this.fechaFin) {
      this.errorMessage = 'Debes seleccionar ambas fechas.';
      return;
    }
  
    if (this.fechaInicio < hoy) {
      this.errorMessage = 'La fecha de inicio no puede ser anterior al dia de hoy.';
      return;
    }
  
    if (this.fechaFin < this.fechaInicio) {
      this.errorMessage = 'La fecha de fin no puede ser anterior a la de inicio.';
      return;
    }

    //obtengo el usuario que crea el evento en el calendario
    const user = this.usuarioService.getUsuario();
    
     if (!user) {
      this.errorMessage = 'No se encontró la sesión del usuario.';
      return;
    }
  
    //recopilo la informacion del evento
    const evento = {
      outfit_id: this.outfitSeleccionado.id,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      user_id: user.id,
    };


    //crea el outfit y redirige a la vista con el calendario
    
    this.calendarioService.createEvento(evento).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['welcome']);
        

      },
      error: err => {
        this.errorMessage = 'Error al guardar el evento.';
      }
    });
  }

}