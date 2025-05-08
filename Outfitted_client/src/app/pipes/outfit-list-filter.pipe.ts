import { Pipe, PipeTransform } from '@angular/core';
import { IOutfit } from '../interfaces/ioutfit';

@Pipe({
  name: 'outfitListFilter',
  standalone: false
})
export class OutfitListFilterPipe implements PipeTransform {

  transform(outfits: IOutfit[], filterBy: string): IOutfit[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? outfits.filter((outfit) =>{
      return outfit.nombre.toLowerCase().indexOf(filterBy) !== -1;
    }) : outfits;
  }

}
