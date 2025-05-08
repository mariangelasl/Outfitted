import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosPrendasService } from '../services/prenda/datos-prendas.service';
import { DatosCategoriasService } from '../services/categoria/datos-categorias.service';
import { DatosEstilosService } from '../services/estilo/datos-estilos.service';
import { DatosTemporadasService } from '../services/temporada/datos-temporadas.service';
import { ICategoria } from '../interfaces/icategoria';
import { IEstilo } from '../interfaces/iestilo';
import { ITemporada } from '../interfaces/itemporada';

@Component({
  selector: 'app-prenda-edit',
  standalone: false,
  templateUrl: './prenda-edit.component.html',
  styleUrl: './prenda-edit.component.css'
})
export class PrendaEditComponent implements OnInit {

  prendaId: number = 0;
  closetId: number = 0;
  myForm: FormGroup;
  errorMessage = '';
  nuevaImagen: File | null = null;
  imagenActualUrl: string = '';
  categorias: ICategoria[] = [];
  estilos: IEstilo[] = [];
  temporadas: ITemporada[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prendaService: DatosPrendasService,
    private categoriaService: DatosCategoriasService,
    private estiloService: DatosEstilosService,
    private temporadaService: DatosTemporadasService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {

    //obtengo el id de la prenda desde el link a editar
    this.prendaId = Number(this.route.snapshot.paramMap.get('id'));

    this.myForm = this.formBuilder.group({
      color: [''],
      categoria_id: [''],
      temporada_id: [''],
      estilo_id: ['']
    });

    // Cargar selects
    this.categoriaService.getCategorias().subscribe(resp => {
      if (resp.body) this.categorias = resp.body;
    });

    this.estiloService.getEstilos().subscribe(resp => {
      if (resp.body) this.estilos = resp.body;
    });

    this.temporadaService.getTemporadas().subscribe(resp => {
      if (resp.body) this.temporadas = resp.body;
    });

    // Cargar datos de la prenda actual en el form
    this.prendaService.getPrenda(this.prendaId).subscribe({
      next: (resp) => {
        const prenda = resp.body;
        if (prenda) {
          this.myForm.setValue({
            color: prenda.color,
            categoria_id: prenda.categoria_id,
            temporada_id: prenda.temporada_id,
            estilo_id: prenda.estilo_id
          });

          this.imagenActualUrl = prenda.imagen_url;
          this.closetId = prenda.closet_id;
        }
      },
      error: (err) => {
        this.errorMessage = 'No se pudo cargar los datos de la prenda.';
      }
    });
  }

  //guardo la nueva imagen
  archivar(event: any) {
    if (event.target.files.length > 0) {
      this.nuevaImagen = event.target.files[0];
    }
  }

  onSubmit(): void {
    
    if(this.myForm.valid){ //si todos los campos estan rellenos

    const datos = new FormData();

    //añado la informacion del form
    
    datos.append('color', this.myForm.get('color')!.value);
    datos.append('categoria_id', this.myForm.get('categoria_id')!.value);
    datos.append('temporada_id', this.myForm.get('temporada_id')!.value);
    datos.append('estilo_id', this.myForm.get('estilo_id')!.value);

    if (this.nuevaImagen) {
      datos.append('imagen', this.nuevaImagen);
    }

    //actualizo la prenda
    this.prendaService.updatePrenda(this.prendaId, datos).subscribe({
      next: () => this.router.navigate(['/closet', this.closetId]),
      error: (err) => this.errorMessage = 'Error al actualizar la prenda.'
    });
  } else{
    this.errorMessage = 'Debe rellenar todos los campos obligatorios';
  }
}
}
