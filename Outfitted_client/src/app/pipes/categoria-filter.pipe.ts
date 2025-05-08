import { Pipe, PipeTransform } from '@angular/core';
import { IPrenda } from '../interfaces/iprenda';

@Pipe({
  name: 'categoriaFilter',
  standalone: false
})
export class CategoriaFilterPipe implements PipeTransform {

  transform(prendas: IPrenda[], filterBy: number): IPrenda[] {
      //filterBy = filterBy ? filterBy.toLowerCase() : '';
      return filterBy ? prendas.filter((prenda) =>{
        return prenda.categoria_id == filterBy;
      }) : prendas;
    }
}
