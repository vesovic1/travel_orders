import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByFieldPipe implements PipeTransform {
  transform(items: any[], field: string, searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      if (item[field]) {
        return item[field].toLowerCase().includes(searchTerm);
      }
      return false;
    });
  }
}