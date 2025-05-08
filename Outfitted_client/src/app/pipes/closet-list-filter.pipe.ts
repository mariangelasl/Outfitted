import { Pipe, PipeTransform } from '@angular/core';
import { ICloset } from '../interfaces/icloset';

@Pipe({
  name: 'closetListFilter',
  standalone: false
})
export class ClosetListFilterPipe implements PipeTransform {

  transform(closets: ICloset[], filterBy: string): ICloset[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? closets.filter((closet) =>{
      return closet.nombre.toLowerCase().indexOf(filterBy) !== -1;
    }) : closets;
  }

}
