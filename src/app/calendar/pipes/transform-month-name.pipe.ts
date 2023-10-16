import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformMonthName',
})
export class TransformMonthNamePipe implements PipeTransform {
  transform(value: string): string {
    const month = value.split(' ')[0];
    const year = value.split(' ')[1];
    switch (month) {
      case 'Марта':
        return 'Март ' + year;
      case 'Мая':
        return 'Май ' + year;
      case 'Августа':
        return 'Август ' + year;
      default:
        return month.slice(0, -1) + 'ь ' + year;
    }
  }
}
