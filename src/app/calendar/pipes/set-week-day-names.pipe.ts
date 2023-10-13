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

  transform(value: Date[]): string[] {
    return value.map((day, index) => {
      if (index > 6) return day.getDate().toString();
      return `${this.DAYS_OF_WEEK[index]}, ${day.getDate()}`;
    });
  }
}
