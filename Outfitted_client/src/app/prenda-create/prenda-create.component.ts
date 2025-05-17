import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosCategoriasService } from '../services/categoria/datos-categorias.service';
import { DatosEstilosService } from '../services/estilo/datos-estilos.service';
import { DatosTemporadasService } from '../services/temporada/datos-temporadas.service';
import { DatosPrendasService } from '../services/prenda/datos-prendas.service';
import { ICategoria } from '../interfaces/icategoria';
import { IEstilo } from '../interfaces/iestilo';
import { ITemporada } from '../interfaces/itemporada';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosUsuariosService } from '../services/usuario/datos-usuarios.service';

@Component({
  selector: 'app-prenda-create',
  standalone: false,
  templateUrl: './prenda-create.component.html',
  styleUrl: './prenda-create.component.css'
})
export class PrendaCreateComponent implements OnInit{

    @Input() idCloset!: number; //se pasa desde prendaList
    
    idUsuario: number = 0;
    myForm: FormGroup;
    errorMessage: string = '';
    categorias: ICategoria[] = [];
    estilos: IEstilo[] = [];
    temporadas: ITemporada[] = [];
    imagenSeleccionada: File| null = null;
    imagenInvalida: boolean = false;

    constructor(
      private categoriaService: DatosCategoriasService,
      private estiloService: DatosEstilosService,
      private temporadaService: DatosTemporadasService,
      private formBuilder: FormBuilder,
      private prendaService : DatosPrendasService,
      private router: Router,
      private route: ActivatedRoute,
      private usuarioService: DatosUsuariosService,

    ) {
      this.myForm = new FormGroup({});
    }
  
    ngOnInit(): void {

      //obtengo id del closet
      this.idCloset = Number(this.route.snapshot.paramMap.get('id'));
      
      //obtengo datos del usuario
      const usuario = this.usuarioService.getUsuario();
        if (usuario) {
          this.idUsuario = usuario.id;
        }
      
      //inicio el form
      this.myForm = this.formBuilder.group({
        color: ['', [Validators.required]],
        categoria_id: ['', [Validators.required]],
        temporada_id: ['', [Validators.required]],
        estilo_id:['', [Validators.required]],
      });


      //cargo la informacion en los select
      this.categoriaService.getCategorias().subscribe(resp => {
        
        if(resp.body) this.categorias = resp.body;
      });

      this.estiloService.getEstilos().subscribe(resp => {
       
        if(resp.body) this.estilos = resp.body;
      });

      this.temporadaService.getTemporadas().subscribe(resp => {
        
        if(resp.body) this.temporadas = resp.body;
      });

    }

    //obtener la imagen que sube el usuario
    archivar(event: any) {
      if (event.target.files.length > 0) {//si selecciono por lo menos una imagen
        this.imagenSeleccionada = event.target.files[0];
      }
    }

    onSubmit() {

      this.imagenInvalida = !this.imagenSeleccionada;

      if(this.myForm.valid && this.imagenSeleccionada){ //si todos los campos estan rellenos

      //agrego la informacion obtenida del form
      let prenda = new FormData();

      prenda.append('imagen', this.imagenSeleccionada);
      prenda.append('color', this.myForm.get('color')!.value);
      prenda.append('categoria_id', this.myForm.get('categoria_id')!.value);
      prenda.append('temporada_id', this.myForm.get('temporada_id')!.value);
      prenda.append('estilo_id', this.myForm.get('estilo_id')!.value);

      //agrego el id del usuario y del closet para almacnarlo en la bd
      prenda.append('user_id', this.idUsuario.toString());
      prenda.append('closet_id', this.idCloset.toString());
      
      //creo la prenda
      this.prendaService.createPrenda(prenda).subscribe({
        next: (data) => {
          
          //vuelvo al closet en el que estaba creando la prenda
          this.router.navigate(['closet', this.idCloset]);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    } else{
      this.errorMessage = 'Debe rellenar todos los campos';
    }
  }
}
