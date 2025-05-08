import { Pipe, PipeTransform } from '@angular/core';
import { IPrenda } from '../interfaces/iprenda';

@Pipe({
  name: 'temporadaFilter',
  standalone: false
})
export class TemporadaFilterPipe implements PipeTransform {

  transform(prendas: IPrenda[], filterBy: number): IPrenda[] {
        //filterBy = filterBy ? filterBy.toLowerCase() : '';
        return filterBy ? prendas.filter((prenda) =>{
          return prenda.temporada_id == filterBy;
        }) : prendas;
      }

}
