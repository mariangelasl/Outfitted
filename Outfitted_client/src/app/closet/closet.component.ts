import { Component, OnInit } from '@angular/core';
import { DatosClosetsService } from '../services/closet/datos-closets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosPrendasService } from '../services/prenda/datos-prendas.service';
import { DatosOutfitsService } from '../services/outfit/datos-outfits.service';


@Component({
  selector: 'app-closet',
  standalone: false,
  templateUrl: './closet.component.html',
  styleUrl: './closet.component.css'
})
export class ClosetComponent implements OnInit{

  idCloset: number = 0;
  nuevoNombre : string = ''; //al editar el closet
  nombreCloset: string = '';
  cantidadPrendas: number = 0;
  cantidadOutfits: number = 0;
  vistaActual: string = 'prendas'; //para saber el contenido de que tab se muestra, por defecto muestra el listado de prendas


  //para compartir closets

  invitado:string='';
  mensajeError:string='';
  mensajeExito:string='';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private closetService: DatosClosetsService,
    private prendaService : DatosPrendasService,
    private outfitService : DatosOutfitsService,
  ) {}


  ngOnInit(): void {

    this.idCloset = +this.route.snapshot.paramMap.get('id')!; //id del closet que seleccionamos en el listado
    
    this.route.queryParams.subscribe(params => {
      if (params['vista']) {
        this.vistaActual = params['vista'];
      }
    });
    
    //obtengo el nombre del closet
    this.closetService.getCloset(this.idCloset).subscribe(resp => {
      if (resp.body) {
        this.nombreCloset = resp.body.nombre;
      }
    });

    
    //obtengo cantidad de prendas y de outfits que hay en el armario

    this.prendaService.getPrendas(this.idCloset).subscribe(resp => {

      if (resp.body) {
        this.cantidadPrendas = resp.body.length;
      }

    });

    this.outfitService.getOutfits(this.idCloset).subscribe(resp => {

      if (resp.body) {
        this.cantidadOutfits = resp.body.length;
      }

    });

  
  }

  //muestra el nombre actual del closet en el modal
  mostrarNombre(){
    this.nuevoNombre = this.nombreCloset;
  }

  //almacena el nuevo nombre del closet (que se escribio en el minput del modal)

  editarCloset() {
    
    const datos = { nombre: this.nuevoNombre};

    this.closetService.updateCloset(this.idCloset, datos).subscribe(resp => {
        if (resp.body) {
          this.nombreCloset = resp.body.nombre;
        }
      });
  }

  //elimina el closet
  eliminarCloset() {
    
      this.closetService.deleteCloset(this.idCloset).subscribe(() => {
        this.router.navigate(['closets-list']);
      });
    
  }

  //metodos para compartir closets

  abrirModalCompartir(): void {
    this.invitado = '';
    this.mensajeError = '';
    this.mensajeExito = '';
  }
  
  compartirCloset(): void {
    
    const datos = {
      closet_id: this.idCloset,
      correo: this.invitado
    };
  
    this.compartidoService.compartirCloset(datos).subscribe({
      next: (resp) => {
        this.mensajeExito = resp.body?.mensaje || 'Closet compartido.';
        this.mensajeError = '';
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || 'No se pudo compartir el closet.';
        this.mensajeExito = '';
      }
    });
  }

}
