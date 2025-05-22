import { Component, Input, OnInit } from '@angular/core';
import { IPrenda } from '../interfaces/iprenda';
import { DatosPrendasService } from '../services/prenda/datos-prendas.service';
import { DatosOutfitsService } from '../services/outfit/datos-outfits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategoria } from '../interfaces/icategoria';
import { IEstilo } from '../interfaces/iestilo';
import { ITemporada } from '../interfaces/itemporada';
import { DatosCategoriasService } from '../services/categoria/datos-categorias.service';
import { DatosEstilosService } from '../services/estilo/datos-estilos.service';
import { DatosTemporadasService } from '../services/temporada/datos-temporadas.service';


@Component({
  selector: 'app-prenda-list',
  standalone: false,
  templateUrl: './prenda-list.component.html',
  styleUrl: './prenda-list.component.css'
})

export class PrendaListComponent implements OnInit{

  @Input() idCloset!: number;
  
  idPrenda :number = 0;
  prendas: IPrenda[] = [];
  

  //para crear/editar outfit
  editarOutfitId: number = 0;
  editar: boolean = false; //para diferenciar cuando se crea de cuando se edita el outfit en el listado
  prendasOutfit: number[] = [];
  nombreOutfit: string = '';

  //para los filtros

  colorFilter:string = '';
  categoriaFilter:number = 0;
  estiloFilter:number = 0;
  temporadaFilter:number = 0;

  categorias : ICategoria[] = [];
  estilos: IEstilo[] = [];
  temporadas: ITemporada[] = [];

  
  constructor(private prendaService: DatosPrendasService,
              private outfitService: DatosOutfitsService,
              private route: ActivatedRoute,
              private categoriaService : DatosCategoriasService,
              private estiloService : DatosEstilosService,
              private temporadaService : DatosTemporadasService,
              private router: Router,

  ){ }

  ngOnInit(): void {
    
    //obtengo las prendas del closet
    this.prendaService.getPrendas(this.idCloset).subscribe(resp => {
    
    if(resp.body) this.prendas = resp.body;
    });
  

    //recojo el id del outfit a editar en caso de que venga de outfit-list

    this.route.queryParams.subscribe(params => {
      if (params['editarOutfitId'] ) { //si hay un outfit para editar
        this.editarOutfitId = +params['editarOutfitId']; //guardo su id
        this.editar = true; //para cambiar de modo creacion a edicion
        this.cargarOutfit(this.editarOutfitId); //marco las casillas de las prendas que conforman el outfit que estoy editando
      }
    });

    //para cargar los select de los filtros

    this.categoriaService.getCategorias().subscribe(resp => {
        
      if(resp.body) this.categorias = resp.body;
    });

    this.estiloService.getEstilos().subscribe(resp => {
     
      if(resp.body) this.estilos = resp.body;
    });

    this.temporadaService.getTemporadas().subscribe(resp => {
      
      if(resp.body) this.temporadas = resp.body;
    });

    //limpia los filtros

    this.colorFilter = '';
    this.categoriaFilter = 0;
    this.estiloFilter = 0;
    this.temporadaFilter = 0;
    
  }

  //recargar el componente para limpiar filtros con el boton

  limpiarFiltros(){
    this.ngOnInit();
  }

  //obtengo el id de la prenda a eliminar
  abrirModal(id: number) {
    this.idPrenda = id;
  }

  //elimino la prenda y sus relaciones
  eliminarPrenda(): void {
    this.prendaService.deletePrenda(this.idPrenda).subscribe({
      next: (data) => {
        // recargamos el componente
        this.ngOnInit();
      }
    });
  }


  //metodos para crear outfit

  //si seleccionan un checkbox

  seleccionada(id: number, event: any): void {
    if (event.target.checked) { //si la casilla esta marcada
      this.prendasOutfit.push(id); //agrego el id de la prenda al array de prendas que conformaran el outfit
    } else { //si desmarca la casilla

      //filtro el array de ids de prendas para no incluir el id de la que se ha desmarcado
      this.prendasOutfit = this.prendasOutfit.filter(prendaId => prendaId != id);
    }
  }

  //compruebo si hay casillas seleccionadas
  haySeleccionadas(): boolean {
    return this.prendasOutfit.length > 0;
  }

  //creo el outfit
  crearOutfit(): void {

    const datos = {
      nombre: this.nombreOutfit,
      closet_id: this.idCloset,
      prendas: this.prendasOutfit
    };
  
    this.outfitService.createOutfit(datos).subscribe({
      next: () => {

        //vacio los valores luego de crear el outfit
        this.nombreOutfit = '';
        this.prendasOutfit = [];
        this.editarOutfitId = 0;
        this.editar = false;
        
        //refresco la lista

        this.ngOnInit();

      },

      error: err => {
        console.error('Error al crear outfit:', err);
      }
      
    });
  }


  //metodos para editar el outfit

  //obtengo el nombre del outfit y el id de las prendas que lo conforman
  cargarOutfit(id: number): void {
    this.outfitService.getOutfit(id).subscribe({
      next: (resp) => {
        const outfit = resp.body;
        if (outfit) {
          this.nombreOutfit = outfit.nombre;
          this.prendasOutfit = outfit.prendas.map(p => p.id); //array de ids
        }
      }
    });
  }

  //actualizo la info del outfit despues de editar
  actualizarOutfit(): void {

    if (this.editarOutfitId){
  
    const datos = {
      nombre: this.nombreOutfit,
      closet_id: this.idCloset,
      prendas: this.prendasOutfit
    };
  
    this.outfitService.updateOutfit(this.editarOutfitId, datos).subscribe({
      next: () => {

        //vacio los valores luego de actualizar el outfit
        this.nombreOutfit = '';
        this.prendasOutfit = [];
        this.editarOutfitId = 0;
        this.editar = false;

        //recargo la lista
        this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {}, // eliminamos los queryParams de editar
        replaceUrl: true
        }).then(() => this.ngOnInit());

      }
    });
    }
  }

  

}
