import { Component, Input, OnInit } from '@angular/core';
import { DatosOutfitsService } from '../services/outfit/datos-outfits.service';
import { IOutfit } from '../interfaces/ioutfit';
import { DatosCalendariosService } from '../services/calendario/datos-calendarios.service';


@Component({
  selector: 'app-outfit-list',
  standalone: false,
  templateUrl: './outfit-list.component.html',
  styleUrl: './outfit-list.component.css'
})
export class OutfitListComponent implements OnInit {

  @Input() idCloset!: number; //se lo paso desde el componente incrustado en el closet vie
  outfits: IOutfit[] = [];
  idOutfit : number = 0;
  outfitFilter:string = '';


  //para agregar outfits al calendario
  outfitSeleccionado:any = null;
  fechaInicio:string = '';
  fechaFin:string = '';
  errorMessage:string ='';

  constructor(private outfitService: DatosOutfitsService,
              private calendarioService: DatosCalendariosService,

  ){ }

  ngOnInit(): void {

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
  
    if (!this.fechaInicio || !this.fechaFin) {
      this.errorMessage = 'Debes seleccionar ambas fechas.';
      return;
    }
  
    if (this.fechaInicio < hoy) {
      this.errorMessage = 'La fecha de inicio no puede ser anterior al dia de hoy.';
      return;
    }
  
    if (this.fechaFin < this.fechaInicio) {
      this.errorMessage = 'La fecha fin no puede ser anterior a la de inicio.';
      return;
    }
  
    const evento = {
      outfit_id: this.outfitSeleccionado.id,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin
    };
  
    this.calendarioService.crearEvento(evento).subscribe({
      next: () => {
        this.errorMessage = '';
        //maybe  recargar la lista
      },
      error: err => {
        this.errorMessage = 'Error al guardar el evento.';
      }
    });
  }

}