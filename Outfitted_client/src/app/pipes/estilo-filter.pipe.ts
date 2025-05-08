import { Pipe, PipeTransform } from '@angular/core';
import { IPrenda } from '../interfaces/iprenda';

@Pipe({
  name: 'estiloFilter',
  standalone: false
})
export class EstiloFilterPipe implements PipeTransform {

  transform(prendas: IPrenda[], filterBy: number): IPrenda[] {
    //filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? prendas.filter((prenda) =>{
      return prenda.estilo_id == filterBy;
    }) : prendas;
  }

}
