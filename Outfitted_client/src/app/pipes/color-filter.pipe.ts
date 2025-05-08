import { Pipe, PipeTransform } from '@angular/core';
import { IPrenda } from '../interfaces/iprenda';


@Pipe({
  name: 'colorFilter',
  standalone: false
})
export class ColorFilterPipe implements PipeTransform {

  transform(prendas: IPrenda[], filterBy: string): IPrenda[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? prendas.filter((prenda) =>{
      return prenda.color.toLowerCase().indexOf(filterBy) !== -1;
    }) : prendas;
  }

}
