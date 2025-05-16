import { Component, OnInit } from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import { addMonths } from 'date-fns';
import { Router } from '@angular/router';
import { DatosCalendariosService } from '../services/calendario/datos-calendarios.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DatosUsuariosService } from '../services/usuario/datos-usuarios.service';


registerLocaleData(localeEs);

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})

export class CalendarioComponent implements OnInit {
  
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  usuarioId:number = 0;

  constructor(
    private calendarioService: DatosCalendariosService,
    private router: Router,
    private usuarioService:DatosUsuariosService,
  ) {}

  ngOnInit(): void {

//obtengo el usuario
    const usuario = this.usuarioService.getUsuario();
    if (usuario) {
      this.usuarioId = usuario.id;
    }

    //cargo los outfits
    this.cargarEventos(); //mes actual
  }

  //carga y actualiza los eventos del mes que se esta mostrando
  cargarEventos(): void {

    //obtengo el mes y año
    const año = this.viewDate.getFullYear();
    const mes = this.viewDate.getMonth() + 1;

//obtengo los outfits
    this.calendarioService.getEventosMes(this.usuarioId, mes, año).subscribe(resp => {
      if (resp.body) {
        console.log('Eventos recibidos:', resp.body);

        this.events = resp.body.map((evento: any) => ({
          id: evento.id,
          start: new Date(evento.fechaInicio),
          end: new Date(evento.fechaFin),
          title: evento.outfit.nombre,
          meta: { outfitId: evento.outfit.id,
                  closetId: evento.outfit.closet?.id,
           },
          color: this.getColorEvento(evento.outfit.id)

        }));
      }
    });
  }

//si selecciona un outfit, lo lleva a la lista de outfits fltrando por el nombre del outfit seleccionado
  handleEvent(event: CalendarEvent): void {
    const closetId = event.meta?.closetId;

    console.log(closetId);
    const nombreOutfit = event.title;

    this.router.navigate(['/closet', closetId], {
    queryParams: {
      vista: 'outfits',
      filtroOutfit: nombreOutfit
    }
  });
  }

//cambiar entre meses
  cambiarMes(direccion: 'anterior' | 'siguiente'): void {
    const cambio = direccion === 'anterior' ? -1 : 1;
    this.viewDate = addMonths(this.viewDate, cambio);
    this.cargarEventos();
  }

  onViewDateChange(date: any): void {
    this.viewDate = date;
    this.cargarEventos();
  }

  //obtener colores distintos para los outfits que se muestran en el calendario
  getColorEvento(outfitId: number): { primary: string; secondary: string } {
  const colores = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c', '#2ecc71']; //cambiar colores
  const color = colores[outfitId % colores.length];
  return { primary: color, secondary: color }; //para que primary y secondary?
  }

  //primary es el borde y secondary el fondo
}
