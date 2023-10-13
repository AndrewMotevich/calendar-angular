import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setWeekDayNames',
  pure: false
})
export class SetWeekDayNamesPipe implements PipeTransform {
  private DAYS_OF_WEEK: string[] = [
    'Понедельнк',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресение',
  ];

  transform(value: Date, index: number): string {
      if (index > 6)  return value.getDate().toString()
      return `${this.DAYS_OF_WEEK[index]}, ${value.getDate()}`
  }
}
