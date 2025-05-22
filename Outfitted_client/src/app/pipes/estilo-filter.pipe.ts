import { Pipe, PipeTransform } from '@angular/core';
import { IPrenda } from '../interfaces/iprenda';

@Pipe({
  name: 'estiloFilter',
  standalone: false
})
export class EstiloFilterPipe implements PipeTransform {

  transform(prendas: IPrenda[], filterBy: number): IPrenda[] {
   
    return filterBy ? prendas.filter((prenda) =>{
      return prenda.estilo_id == filterBy;
    }) : prendas;
  }

}
