import { Component, OnInit } from '@angular/core';
import { DatosEstadisticasService } from '../services/estadistica/datos-estadisticas.service';
import { DatosUsuariosService } from '../services/usuario/datos-usuarios.service';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  nombreUsuario: string = '';

  //estadisticas

  prendaMasUsada: any = null;
  prendaMenosUsada: any = null;
  colorMasUsado: string = '';
  outfitsSinUsar: any[] = [];
  prendasSinUsar: any[] = []; 


  constructor(private estadisticaService: DatosEstadisticasService,
              private usuarioService: DatosUsuariosService,
  ) { }

  ngOnInit(): void {

    if (typeof window !== 'undefined') {
    const usuario = this.usuarioService.getUsuario();
    if (usuario) {
      this.nombreUsuario = usuario.name;
      const id = usuario.id;

    this.estadisticaService.getPrendaMasUsada(id).subscribe(resp =>{
      console.log('mas usada', resp);
      if (resp) 
        this.prendaMasUsada = resp.body;
    });

    this.estadisticaService.getPrendaMenosUsada(id).subscribe(resp =>{
      console.log('menos usada', resp); 
      this.prendaMenosUsada = resp.body;
    });

    this.estadisticaService.getColorMasUsado(id).subscribe(c => 
      {console.log('color', c); 
        this.colorMasUsado = c?.color});    
    
    this.estadisticaService.getOutfitsSinUsar(id).subscribe(o => this.outfitsSinUsar = o.slice(0, 5));
    this.estadisticaService.getPrendasSinUsar(id).subscribe(p => this.prendasSinUsar = p.slice(0, 5));
    }
    }
  }
}
